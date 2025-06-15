import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfesorService, Profesor } from '../../services/profesor.service';
import { AusenciaService } from '../../services/ausencia.service';
import { HorarioService } from '../../services/horario.service';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';
import { ModalErrorComponent } from '../modal-error/modal-error.component';

@Component({
  selector: 'app-registro-ausencia',
  standalone: true,
  imports: [FormsModule, CommonModule, ModalRegistroComponent, ModalErrorComponent],
  templateUrl: '../registro-ausencia/registro-ausencia.component.html',
  styleUrls: ['../registro-ausencia/registro-ausencia.component.css']
})
export class RegistroAusenciaComponent implements OnInit {

  // Para acceder al componente hijo
  @ViewChild('formRegistro') formRegistro!: NgForm;

  // Permite acceder al componente hijo a través de una variable
  @ViewChild('modalRegistro') modalRegistro!: ModalRegistroComponent;
  @ViewChild('modalError') modalError!: ModalErrorComponent;

  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  // Datos del usuario autenticado
  usuario: { rol: string, dniProfesor: string, cursoAcademico: string } | null = null;

  // Lista de profesores para Equipo Directivo
  profesores: Profesor[] = [];
  //Horarios del profesor seleccionado
  horarios: any[] = [];
  // Fecha mínima permitida
  hoy: string = '';

  // Datos de la ausencia que se va a registrar
  ausencia = {
    id: null as { dniProfesor: string, cursoAcademico: string } | null,
    fechaAusencia: '',
    comentario: '',
    tramoSeleccionado: ''
  };

  // Opciones para el select de tramos horarios
  tramosDisponibles = [{ value: '', label: 'Seleccione un tramo' }];
  selectTramoDisabled = true;

// Variables límite para seleccionar fechas
  year!: number;
  diaActual: Date = new Date();  
  fechaMin!: string;
  fechaMax!: string;
 
   

  constructor(
    private ausenciaService: AusenciaService,
    private profesorService: ProfesorService,
    private horarioService: HorarioService
  ) { }

  ngOnInit(): void {
    // Establece la fecha actual
    const fechaActual = new Date();
    this.hoy = fechaActual.toISOString().split('T')[0];

    // Carga el usuario guardado en sesión
    const usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario = usuario;

      // Rango de fechas para registrar ausencias
      this.year = parseInt(usuario.cursoAcademico);
      this.fechaMin = this.formatearFecha(this.diaActual);
      this.fechaMax = `${this.year+1}-06-20`;

      // Al iniciar el componente, si el rol es Profesor, asignamos el id de ausencia con los datos del usuario autenticado y cargamos sus horarios
      if (usuario.rol === 'Profesor' && usuarioGuardado) {
        this.setProfesor(usuario.dniProfesor, usuario.cursoAcademico);
      }
      // Si el rol es Equipo Directivo, cargamos la lista completa de profesores
      if (usuario.rol === 'Equipo Directivo') {
        this.profesorService.getProfesores().subscribe({
          next: profesores => this.profesores = profesores,
          error: err => console.error('Error al cargar profesores:', err)
        });
      }
      console.log('Rol usuario:', usuario.rol);
    }
  }

  // Método privado para fijar el profesor y cargar sus horarios
  private setProfesor(dni: string, curso: string): void {
    this.ausencia.id = { dniProfesor: dni, cursoAcademico: curso };
    this.cargarHorariosProfesor();
  }

  // Convierte un número de hora a texto para mostrar en el select
  numeroAHoraTexto(hora: number): string {
    return ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta', 'Sexta'][hora - 1] || `Hora ${hora}`;
  }

  // Carga los horarios del profesor usando el servicio
  cargarHorariosProfesor(): void {
    if (!this.ausencia.id) {
      this.resetTramos();
      return;
    }
    this.horarioService.getHorariosProfesor(this.ausencia.id.dniProfesor, this.ausencia.id.cursoAcademico)
      .subscribe({
        next: horarios => {
          this.horarios = horarios;
          this.resetTramos();
          this.onFechaCambio();
        },
        error: err => {
          console.error('Error cargando horarios:', err);
          this.horarios = [];
          this.resetTramos();
        }
      });
  }

  // Reinicia las opciones del select de tramos y deshabilita la selección
  private resetTramos(): void {
    this.ausencia.tramoSeleccionado = '';
    this.tramosDisponibles = [{ value: '', label: 'Seleccione un tramo' }];
    this.selectTramoDisabled = true;
  }

  // Se ejecuta cuando cambia la fecha seleccionada para la ausencia
  onFechaCambio(): void {
    this.ausencia.tramoSeleccionado = '';
    if (!this.ausencia.fechaAusencia) {
      this.resetTramos();
      return;
    }

    // Si es sábado (6) o domingo (0), no se pueden registrar tramos
    const fecha = new Date(this.ausencia.fechaAusencia);
    const diaSemana = fecha.getDay();

    if (diaSemana === 0 || diaSemana === 6) {
      this.resetTramos();
      return;
    }

    // Validación de rango de fechas del curso
    if (!this.fechaDentroDelCurso(this.ausencia.fechaAusencia)) {
      this.mostrarError('La fecha seleccionada está fuera del rango del curso académico.');
      this.resetTramos();
      return;
    }

    // Filtra los horarios del día seleccionado
    const horariosDelDia = this.horarios.filter(h => h.dia === diaSemana);

    // Si no hay horarios para ese día, se resetean tramos
    if (horariosDelDia.length === 0) {
      this.resetTramos();
      return;
    }

    // Se añaden opciones por defecto y la opción de día completo
    this.tramosDisponibles = [{ value: '', label: 'Seleccione un tramo' }, { value: 'diaCompleto', label: 'Día completo' }];

    // Se crea un conjunto de horas únicas para no repetir opciones
    const horasUnicas = new Set<number>();
    horariosDelDia.forEach(h => {
      if (!horasUnicas.has(h.hora)) {
        horasUnicas.add(h.hora);
        this.tramosDisponibles.push({ value: h.hora.toString(), label: `${this.numeroAHoraTexto(h.hora)} hora` });
      }
    });

    this.selectTramoDisabled = false;
  }

  fechaDentroDelCurso(fechaStr: string): boolean {
    if (!this.ausencia.id) return false;
    const fecha = new Date(fechaStr);
    const [anioInicioStr] = this.ausencia.id.cursoAcademico.split('/');
    const anioInicio = parseInt(anioInicioStr, 10);
    const anioFin = anioInicio + 1;

    const fechaInicioCurso = new Date(anioInicio, 8, 15); // 15 septiembre
    const fechaFinCurso = new Date(anioFin, 5, 21); // 20 junio

    return fecha >= fechaInicioCurso && fecha <= fechaFinCurso;
  }

  // Se ejecuta cuando cambia el profesor seleccionado (en equipo directivo)
  onProfesorChange(): void {
    if (!this.ausencia.id) {
      this.resetTramos();
      this.horarios = [];
      return;
    }

    this.cargarHorariosProfesor();

    // Si ya hay fecha seleccionada, actualiza los tramos para esa fecha
    if (!this.ausencia.fechaAusencia) {
      this.resetTramos();
    } else {
      this.onFechaCambio();
    }
  }

  // Maneja el envío del formulario para registrar la ausencia
  async onSubmit(formRegistro: NgForm): Promise<void> {
    if (formRegistro.invalid) {
      return;
    }

    if (!this.fechaDentroDelCurso(this.ausencia.fechaAusencia)) {
      return this.mostrarError('La fecha seleccionada está fuera del rango del curso académico.');
    }

    const diaSemana = new Date(this.ausencia.fechaAusencia).getDay();

    // No permite registrar ausencias en fines de semana
    if (diaSemana === 0 || diaSemana === 6) return this.mostrarError('No se pueden registrar ausencias en fines de semana.');

    let horasAfectadas: number[] = [];
    if (this.ausencia.tramoSeleccionado === 'diaCompleto') {
      horasAfectadas = [1, 2, 3, 4, 5, 6];
    } else {
      const hora = parseInt(this.ausencia.tramoSeleccionado);
      if (!isNaN(hora)) horasAfectadas = [hora];
    }

    // Filtra los horarios que coinciden con el día y tramo seleccionado
    const horariosSeleccionados = this.horarios.filter(h => h.dia === diaSemana && horasAfectadas.includes(h.hora));

    if (horariosSeleccionados.length === 0) return this.mostrarError('El tramo seleccionado no corresponde a ninguna hora de clase.');

    // Mapea cada horario a una promesa de creación de ausencia
    const registros = horariosSeleccionados.map(horario => {
      const ausenciaDTO = {
        id: this.ausencia.id,
        fechaAusencia: this.ausencia.fechaAusencia,
        comentario: this.ausencia.comentario,
        numRegistro: horario.numRegistro
      };
      return this.ausenciaService.crearRegistroAusencia(ausenciaDTO).toPromise();
    });

    // Ejecuta todas las peticiones y maneja el resultado
    try {
      await Promise.all(registros);
      this.modalRegistro.mostrarModal();
      this.limpiarFormulario(formRegistro);
    } catch (err: any) {
      if (err.status === 409) {
        this.mostrarError('Ya existe una ausencia registrada para ese día y tramo horario.');
      } else {
        this.mostrarError('Error al registrar la ausencia. Inténtalo de nuevo.');
      }
    }
  }

  // Limpia y resetea el formulario de ausencia
  limpiarFormulario(form: NgForm): void {
    const usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      form.resetForm();
      // Si es profesor, mantiene la selección fija
      if (usuario.rol === 'Profesor' && usuarioGuardado) {
        this.setProfesor(usuario.dniProfesor, usuario.cursoAcademico);
      } else {
        this.ausencia.id = null;
      }
      this.horarios = [];
      this.resetTramos();
    }
  }

  // Variable para controlar el modal error
  modalErrorActivo: boolean = false;

  mostrarError(mensaje: string) {
    this.modalError.mensajeError = mensaje;
    this.modalError.modalErrorActivo = true;
  }

  onCerrarModalError(): void {
    if (this.formRegistro) {
      this.formRegistro.resetForm();
    }
    this.resetTramos();
    this.horarios = [];
    if (this.usuario?.rol === 'Profesor') {
      this.setProfesor(this.usuario.dniProfesor, this.usuario.cursoAcademico);
    } else {
      this.ausencia.id = null;
    }
  }



  // Método para dar formato a la fecha 
  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0]; // Se queda solo con la fecha 'YYYY-MM-DD'
  }


}
