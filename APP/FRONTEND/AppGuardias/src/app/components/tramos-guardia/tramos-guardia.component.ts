import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor, ProfesorService } from '../../services/profesor.service';
import { GuardiaService } from '../../services/guardia.service';
import { Ausencia, AusenciaService } from '../../services/ausencia.service';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';
import { ModalErrorComponent } from "../modal-error/modal-error.component";


@Component({
  selector: 'app-tramos-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalRegistroComponent, ModalErrorComponent],
  templateUrl: './tramos-guardia.component.html',
  styleUrl: './tramos-guardia.component.css',
  providers: [GuardiaService, ProfesorService, AusenciaService]
})

export class TramosGuardiaComponent {

  // Permite acceder al componente hijo a través de una variable
  @ViewChild('modalRegistro') modalRegistro!: ModalRegistroComponent;
  @ViewChild('modalError') modalError!: ModalErrorComponent;


  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variable que almacena la ausencia correspondiente (la recibe del padre)
  idAusencia!: number;

  // Variable que almacena el grupo correspondiente de la ausencia (la recibe del padre)
  grupo!: string;

  // Variable que almacena el objeto ausencia completo
  ausencia!: Ausencia;

  // Array que almacena las guardias de la ausencia
  guardias: any[] = [];

  // Objeto que almacena si los checkbox están marcados (checked) o no
  checkboxMarcados: {
    [tramo: number]: boolean
  } = {}

  // Array de profesores para mostrar en el select
  profesores: Profesor[] = [];



  // Evento que se manda al padre en caso de se haya actualizado alguna guardia (creado o borrado)
  @Output() guardiasActualizadas = new EventEmitter<void>();


  constructor(
    private profesorService: ProfesorService,
    private guardiaService: GuardiaService,
    private ausenciaService: AusenciaService
  ) { }


  // Cargar ausencia
  cargarAusencia(idAusencia: number): void {
    this.ausenciaService.getById(idAusencia).subscribe({
      next: (data) => {
        this.ausencia = data;
        console.log("Ausencia cargada: ", this.ausencia);
      },
      error: (error) => {
        console.error("Error al cargar ausencia:", error);
      }
    });
  }


  // Cargar las guardias asociadas a la ausencia
  cargarGuardias(idAusencia: number) {
    this.idAusencia = idAusencia;
    this.cargarAusencia(idAusencia);
    this.guardiaService.getGuardiasPorIdAusencia(idAusencia).subscribe({
      next: data => {
        this.guardias = data;
        console.log("Guardias: ", this.guardias)
      },
      error: err => {
        console.error("Error al cargar las guardias correspondientes a la ausencia: " + idAusencia, err);
      }
    });
  }


  // Comprobar si existe una guardia registrada para un tramo concreto
  existeTramoGuardia(tramo: number): boolean {
    const existeTramo = this.guardias.some(guardia => guardia.tramo === tramo);
    return existeTramo;
  }

  // Comprobar si existe la hora completa está registrada o marcada
  existeHoraCompleta(): boolean {
    const existeHoraCompletaRegistrada = this.guardias.some(guardia => guardia.tramo === 5);
    const existeHoraCompletaMarcada = this.checkboxMarcados[5];
    if (existeHoraCompletaRegistrada || existeHoraCompletaMarcada) {
      return true;
    } else {
      return false;
    }
  }

  // Deshabilitar el checkbox de hora completa si existe algun tramo guardado o marcado
  deshabilitarHoraCompleta(): boolean {
    const existeAlgunTramoRegistrado = this.guardias.some(guardia => guardia.tramo >= 1 && guardia.tramo <= 4);
    const existeAlgunTramoMarcado = [1, 2, 3, 4].some(tramo => this.checkboxMarcados[tramo] == true);
    if (existeAlgunTramoRegistrado || existeAlgunTramoMarcado) {
      return true;
    } else {
      return false;
    }
  }

  // Cargar el nombre del profesor asignado a un tramo de guardia
  cargarProfesorPorTramo(tramo: number): string {
    const guardia = this.guardias.find(g => g.tramo === tramo);
    if (guardia) {
      return guardia.profesor.nombreProfesor;
    }
    return '';
  }


  // Almacenar el estado (checked o no) de un checkbox
  estadoCheckbox(event: Event, tramo: number): void {
    this.checkboxMarcados[tramo] = (event.target as HTMLInputElement).checked;
    console.log("estado checkbox: ", this.checkboxMarcados);
  }


  // Cargar profesores del select (Perfil Directivo)
  cargarProfesoresSelect() {
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });
  }


  // Verificar si la guardia ya está completa (todos los tramos asignados u hora completa)
  guardiaCompleta(): boolean {
    if (this.existeHoraCompleta()) {
      return true;
    } else {
      for (let tramo = 1; tramo <= 4; tramo++) {
        if (!this.existeTramoGuardia(tramo)) {
          return false;
        }
      }
      return true;
    }
  }



  // Método para registrar guardias
  registrarGuardias(form: NgForm): void {
    const guardiasRegistro: any[] = [];

    const idProfesorAusente = {
      dniProfesor: this.ausencia.profesor.id.dniProfesor,
      cursoAcademico: this.ausencia.profesor.id.cursoAcademico
    };

    const idProfesorGuardia = {
      dniProfesor: '',
      cursoAcademico: ''
    };

    /* Verificar los checkbox de tramos que realmente se van a mandar en el registro
    (deben estar seleccionados/checked y habilitados; los deshabilitados no se mandan) */
    for (let tramo = 1; tramo <= 5; tramo++) {
      const checkboxMarcado = this.checkboxMarcados[tramo];
      if (checkboxMarcado && !this.existeTramoGuardia(tramo)) {

        // Guardar el valor del profesor de guardia
        if (this.usuario.rol == 'Profesor') {
          idProfesorGuardia.dniProfesor = this.usuario.dniProfesor;
          idProfesorGuardia.cursoAcademico = this.usuario.cursoAcademico;
        } else {
          let select = document.querySelector(`select[data-tramo="${tramo}"]`) as HTMLSelectElement;

          // Verificar que se ha seleccionado un profesor en el select
          if (!select || !select.value) {
            this.mostrarError("Debe seleccionar un profesor para el tramo: " + tramo);
            return;
          }

          // Aignar el profesor del array de profesores cargado
          let nombreProfesorSelect = select.value;
          let profesorGuardia = this.profesores.find(profesor => profesor.nombreProfesor === nombreProfesorSelect);
          if (!profesorGuardia) {
            this.mostrarError("No se encuentra el profesor de guardia seleccionado para el tramo: " + tramo);
            return;
          }
          idProfesorGuardia.dniProfesor = profesorGuardia?.id.dniProfesor;
          idProfesorGuardia.cursoAcademico = profesorGuardia?.id.cursoAcademico;
        }

        //Verificar que el profesor de guardia no es el mismo que el profesor de la ausencia
        if (idProfesorGuardia.dniProfesor == idProfesorAusente.dniProfesor && idProfesorGuardia.cursoAcademico == idProfesorAusente.cursoAcademico) {
          this.mostrarError("El profesor de guardia no puede ser el mismo que el profesor ausente.")
          return;
        }

        const guardiaDTO = {
          grupo: this.grupo,
          tramo: tramo,
          idProfesorGuardia: idProfesorGuardia,
          idAusencia: this.idAusencia
        }
        guardiasRegistro.push(guardiaDTO);
      }
    }
    //console.log("guardias que se envian: ", guardiasRegistro);

    if (guardiasRegistro.length == 0) {
      this.mostrarError("Debe seleccionar algún tramo de guardia o cerrar el formulario de tramos de guardia");
      return;
    }

    // Si todo está ok, se registran las guardias
    this.guardiaService.registrarGuardias(guardiasRegistro).subscribe({
      next: (respuesta) => {
        console.log("guardias que se han registrado: ", respuesta);
        this.modalRegistro.mostrarModal();
        this.cargarGuardias(this.idAusencia);
        this.guardiasActualizadas.emit();
        //this.cerrarModal();
      },
      error: (error) => {
        console.error("Error al registrar guardias:", error);
        this.mostrarError("Error al registrar las guardias. Inténtelo de nuevo.");
      }
    });
  }



  eliminarGuardia() {

  }


  cerrarModal() {
    this.checkboxMarcados = {};
    this.modalActivo = false;
  }


  mostrarError(mensaje: string) {
    this.modalError.mensajeError = mensaje;
    this.modalError.modalErrorActivo = true;
  }




}
