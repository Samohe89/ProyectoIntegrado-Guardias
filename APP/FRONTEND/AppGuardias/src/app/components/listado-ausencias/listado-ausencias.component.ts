import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import {
  Ausencia,
  AusenciaService,
  Profesor,
} from '../../services/ausencia.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';
import { ModalTareaComponent } from '../modal-tarea/modal-tarea.component';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { ModalBorradoComponent } from '../modal-borrado/modal-borrado.component';
import { ModalInfoEliminarAusenciaComponent } from '../modal-infoEliminarAusencia/modal-info-eliminar-ausencia.component';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-listado-ausencias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FiltradoComponent,
    ModalEliminarComponent,
    ModalTareaComponent,
    ModalBorradoComponent,
    ModalInfoEliminarAusenciaComponent,
    DatePipe,
  ],
  providers: [DatePipe],
  templateUrl: './listado-ausencias.component.html',
  styleUrl: './listado-ausencias.component.css',
})
export class ListadoAusenciasComponent implements OnInit {
  @ViewChild('modalEliminar', { static: false })
  modalEliminar!: ModalEliminarComponent;

  @ViewChild('modalTarea', { static: false })
  modalTarea!: ModalTareaComponent;

  @ViewChild('modalBorrado', { static: false })
  modalBorrado!: ModalBorradoComponent;

  @ViewChild('modalInfoEliminarAusencia', { static: false })
  modalInfoEliminarAusencia!: ModalInfoEliminarAusenciaComponent;

  ausencias: Ausencia[] = [];
  todasLasAusencias: Ausencia[] = [];
  ausenciasFiltro: Ausencia[] = [];

  profesores: Profesor[] = [];

  mostrarModal: boolean = false;
  ausenciaSeleccionada: Ausencia | null = null;

  usuario: { rol: string; dniProfesor: string; cursoAcademico: string } | null =
    null;

  dniProfesorLogueado: string = '';

  //Filtrado
  fechaDesde: string = '';
  fechaHasta: string = '';
  profesorFiltro: string = '';

  fechaUnica: Date = new Date(); // Fecha mostrada como "Guardias del día ..."
  diaActual: Date = new Date(); // Hoy
  diaSiguiente: Date = new Date(); // Mañana

  constructor(
    private ausenciaService: AusenciaService,
    private profesorService: ProfesorService,
    private pdfGeneratorService: PdfGeneratorService,
    private datePipe: DatePipe
  ) {}

  isMobileView: boolean = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobileView = window.innerWidth <= 768;
    this.recargarVista();
  }

  recargarVista() {
    // Forzar refresco si necesitas hacer algo al cambiar entre móvil/escritorio.
    this.ausencias = [...this.ausenciasFiltro];
  }

  isMobile(): boolean {
    return this.isMobileView;
  }

  ngOnInit() {
    const usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.dniProfesorLogueado = usuario.dniProfesor;
      this.usuario = usuario;

      // Normalizamos la fecha actual a medianoche (00:00:00)
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      this.diaActual = new Date(hoy);
      this.fechaUnica = new Date(hoy);
      this.diaSiguiente = new Date(hoy);
      this.diaSiguiente.setDate(hoy.getDate() + 1);

      this.ausenciaService.getAll().subscribe((data) => {
        this.todasLasAusencias = data;

        if (usuario.rol === 'Equipo Directivo') {
          this.profesorService.getProfesores().subscribe({
            next: (profesores) => (this.profesores = profesores),
            error: (err) => console.error('Error al cargar profesores:', err),
          });
        }

        if (usuario.rol === 'Profesor') {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          const ausenciasFiltradas = data.filter((ausencia) => {
            const esProfesor =
              ausencia.profesor?.id?.dniProfesor === this.dniProfesorLogueado;
            const fechaAusencia = new Date(ausencia.fechaAusencia);
            fechaAusencia.setHours(0, 0, 0, 0);
            const esHoy = fechaAusencia >= hoy;
            return esProfesor && esHoy;
          });
          this.ausenciasFiltro = ausenciasFiltradas.sort(
            (a, b) =>
              new Date(a.fechaAusencia).getTime() -
                new Date(b.fechaAusencia).getTime() ||
              (a.horariosProfesor?.hora !== undefined &&
              b.horariosProfesor?.hora !== undefined
                ? a.horariosProfesor.hora - b.horariosProfesor.hora
                : 0)
          );
          this.ausencias = [...this.ausenciasFiltro];
        }

        if (usuario.rol === 'Equipo Directivo') {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          const ausenciasFiltradas = data.filter((ausencia) => {
            const fechaAusencia = new Date(ausencia.fechaAusencia);
            fechaAusencia.setHours(0, 0, 0, 0);
            return fechaAusencia >= hoy;
          });
          this.ausenciasFiltro = ausenciasFiltradas.sort(
            (a, b) =>
              new Date(a.fechaAusencia).getTime() -
                new Date(b.fechaAusencia).getTime() ||
              (a.horariosProfesor?.hora !== undefined &&
              b.horariosProfesor?.hora !== undefined
                ? a.horariosProfesor.hora - b.horariosProfesor.hora
                : 0)
          );
          this.ausencias = [...this.ausenciasFiltro];
        }
      });
    } else {
      console.log('No hay usuario para esta sesión');
    }
    this.fechaDesde = '';
    this.fechaHasta = '';
  }

  cargarAusencias(dia: Date) {
    this.fechaDesde = '';
    this.fechaHasta = '';
    const fechaSeleccionada = new Date(dia);
    fechaSeleccionada.setHours(0, 0, 0, 0);

    // Actualiza fecha mostrada
    this.fechaUnica = new Date(fechaSeleccionada);

    // Filtra las ausencias para el profesor y la fecha seleccionada
    if (this.usuario?.rol === 'Profesor') {
      this.ausencias = this.todasLasAusencias.filter((ausencia) => {
        const esProfesor =
          ausencia.profesor?.id?.dniProfesor === this.dniProfesorLogueado;

        const fechaAusencia = new Date(ausencia.fechaAusencia);
        fechaAusencia.setHours(0, 0, 0, 0);

        return (
          esProfesor && fechaAusencia.getTime() === fechaSeleccionada.getTime()
        );
      });
    }
  }

  // Método para verificar la equivalencia de fechas
  esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    if (fecha1.toDateString() === fecha2.toDateString()) {
      return true;
    } else {
      return false;
    }
  }

  aplicarFiltrosDesdeComponente(event: {
    fechaDesde: string;
    fechaHasta: string;
    profesorFiltro: string | null;
  }) {
    let filtradas = this.todasLasAusencias;

    const tieneFechaDesde = !!event.fechaDesde;
    const tieneFechaHasta = !!event.fechaHasta;

    // Si hay fechas, filtra por fechas
    if (tieneFechaDesde) {
      const desde = new Date(event.fechaDesde);
      desde.setHours(0, 0, 0, 0);

      const hasta = tieneFechaHasta ? new Date(event.fechaHasta) : null;
      if (hasta) hasta.setHours(23, 59, 59, 999);

      filtradas = filtradas.filter((ausencia) => {
        const fechaAusencia = new Date(ausencia.fechaAusencia);
        fechaAusencia.setHours(0, 0, 0, 0);

        const dentroDeDesde = fechaAusencia >= desde;
        const dentroDeHasta = hasta ? fechaAusencia <= hasta : true;

        return dentroDeDesde && dentroDeHasta;
      });

      // Guardar fechas solo si se usan
      this.fechaDesde = event.fechaDesde;
      this.fechaHasta = event.fechaHasta;
    } else {
      // Si no hay fechas, vaciamos el texto de los rangos mostrados
      this.fechaDesde = '';
      this.fechaHasta = '';
    }

    // 4. Filtrar por profesor (si hay)
    if (event.profesorFiltro) {
      const nombre = event.profesorFiltro.toLowerCase();
      filtradas = filtradas.filter((ausencia) =>
        ausencia.profesor?.nombreProfesor?.toLowerCase().includes(nombre)
      );
    }

    // 5. Actualizar fechas y ausencias para mostrar
    this.ausencias = filtradas;
  }

  //Lógica para eliminar una ausencia
  abrirModal(ausencia: Ausencia) {
    this.ausenciaSeleccionada = ausencia;
    this.modalEliminar.mostrarModal();
  }

  manejarEliminacion(confirmado: boolean): void {
    if (confirmado && this.ausenciaSeleccionada) {
      this.ausenciaService.delete(this.ausenciaSeleccionada.id!).subscribe({
        next: () => {
          const idEliminado = this.ausenciaSeleccionada?.id;

          this.ausencias = this.ausencias.filter((a) => a.id !== idEliminado);
          this.ausenciasFiltro = this.ausenciasFiltro.filter(
            (a) => a.id !== idEliminado
          );
          setTimeout(() => {
            this.modalBorrado.mostrarModal();
          }, 300);
          this.ausenciaSeleccionada = null;
        },
        error: (err) => {
          // Si el error es 500, muestra el modal de info
          if (err.status === 500) {
            this.modalInfoEliminarAusencia.mostrarModal();
          } else {
            // Puedes manejar otros errores aquí si lo deseas
            console.error('Error al eliminar ausencia:', err);
          }
        },
      });
    }
  }

  abrirModalTarea(ausencia: Ausencia) {
    this.ausenciaSeleccionada = ausencia;
    this.modalTarea.ausencia = ausencia;
    this.modalTarea.mostrarModal();
  }

  guardaTarea(ausencia: Ausencia) {
    // Actualiza el array o recarga las ausencias
    const index = this.ausencias.findIndex((a) => a.id === ausencia.id);
    if (index !== -1) {
      this.ausencias[index].tarea = ausencia.tarea;
    }
  }

  // Generar el informe PDF
  async imprimirPDF(): Promise<void> {
    const subtitulo = 'LISTADO DE AUSENCIAS';

    const filtros: any = {};
    if (this.fechaDesde === null || this.fechaHasta === null) {
      filtros['Fecha desde'] = this.fechaUnica
        ? this.datePipe.transform(this.fechaUnica, 'dd/MM/yyyy') ?? ''
        : '';
      filtros['Fecha hasta'] = this.fechaUnica
        ? this.datePipe.transform(this.fechaUnica, 'dd/MM/yyyy') ?? ''
        : '';
    } else {
      filtros['Fecha desde'] = this.fechaDesde
        ? this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy') ?? ''
        : '';
      filtros['Fecha hasta'] = this.fechaHasta
        ? this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy') ?? ''
        : '';
    }

    const headers = ['Fecha', 'Grupo', 'Hora', 'Profesor', 'Asignatura'];

    const data: (string | number)[][] = this.ausencias.map((ausencia) => [
      this.datePipe.transform(ausencia.fechaAusencia, 'dd/MM/yyyy') ?? '',
      ausencia.horariosProfesor.grupo,
      ausencia.horariosProfesor.hora + 'ª Hora',
      ausencia.profesor.nombreProfesor,
      ausencia.horariosProfesor.asignatura,
    ]);

    await this.pdfGeneratorService.generarPdfTabla(
      subtitulo,
      filtros,
      headers,
      data,
      'informe-ausencias.pdf',
      {
        profesorFiltrado: this.profesorFiltro || '',
        margin: { left: 15, right: 15 },
      }
    );
  }
}
