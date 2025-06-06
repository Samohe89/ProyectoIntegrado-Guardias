import { Component, computed, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor, ProfesorService } from '../../services/profesor.service';
import { GuardiaService } from '../../services/guardia.service';

@Component({
  selector: 'app-tramos-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramos-guardia.component.html',
  styleUrl: './tramos-guardia.component.css',
  providers: [GuardiaService]
})

export class TramosGuardiaComponent {

  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variable que almacena la ausencia correspondiente (la recibe del padre)
  idAusencia!: number;

  // Array que almacena las guardias de la ausencia
  guardias: any[] = [];

  // Objeto que almacena si los checkbox están marcados (checked) o no
  checkboxMarcados: {
    [tramo: number]: boolean
  } = {}


  // Array de profesores para mostrar en el select
  profesores: Profesor[] = [];




  constructor(
    private profesorService: ProfesorService,
    private guardiaService: GuardiaService
  ) { }


  ngOnInit(): void {
    // Cargar los profesores del select al inicio (Perfil Directivo)
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });
  }



  // Cargar las guardias asociadas a la ausencia
  cargarGuardias(idAusencia: number) {
    this.idAusencia = idAusencia;
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
    const checked = (event.target as HTMLInputElement).checked;
    this.checkboxMarcados[tramo] = checked;
  }


  // Cargar profesores del select (Perfil Directivo)
  cargarProfesoresSelect() {
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });
  }




  eliminarGuardia() {

  }


onSubmit() {

  this.cerrarModal();

}


  cerrarModal() {
    this.checkboxMarcados = {};
    this.modalActivo = false;
  }




}
