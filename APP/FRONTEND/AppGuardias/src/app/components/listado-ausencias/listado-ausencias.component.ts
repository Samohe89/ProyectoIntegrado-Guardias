import { Component, HostListener, OnInit } from '@angular/core';
import {
  Ausencia,
  AusenciaService,
  Profesor,
} from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';

@Component({
  selector: 'app-listado-ausencias',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltradoComponent],
  templateUrl: './listado-ausencias.component.html',
  styleUrl: './listado-ausencias.component.css',
})
export class ListadoAusenciasComponent implements OnInit {
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
    private profesorService: ProfesorService
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
          this.ausenciasFiltro = ausenciasFiltradas;
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
          this.ausenciasFiltro = ausenciasFiltradas;
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

    // 1. Convertir y normalizar fechaDesde
    const desde = new Date(event.fechaDesde);
    desde.setHours(0, 0, 0, 0);

    // 2. Convertir y normalizar fechaHasta si existe
    const hasta = event.fechaHasta ? new Date(event.fechaHasta) : null;
    if (hasta) hasta.setHours(23, 59, 59, 999);

    // 3. Filtrar por rango de fechas
    filtradas = filtradas.filter((ausencia) => {
      const fechaAusencia = new Date(ausencia.fechaAusencia); // <-- CONVERSIÓN AQUÍ
      fechaAusencia.setHours(0, 0, 0, 0);

      const dentroDeDesde = fechaAusencia >= desde;
      const dentroDeHasta = hasta ? fechaAusencia <= hasta : true;

      return dentroDeDesde && dentroDeHasta;
    });

    // 4. Filtrar por profesor (si hay)
    if (event.profesorFiltro) {
      const nombre = event.profesorFiltro.toLowerCase();
      filtradas = filtradas.filter((ausencia) =>
        ausencia.profesor?.nombreProfesor?.toLowerCase().includes(nombre)
      );
    }

    // 5. Actualizar fechas y ausencias para mostrar
    this.fechaDesde = event.fechaDesde;
    this.fechaHasta = event.fechaHasta;
    this.ausencias = filtradas;
  }

  //Lógica para eliminar una ausencia

  abrirModal(ausencia: Ausencia) {
    this.ausenciaSeleccionada = ausencia;
    this.mostrarModal = true;
  }

  cancelarEliminacion() {
    this.ausenciaSeleccionada = null;
    this.mostrarModal = false;
  }

  confirmarEliminacion() {
    if (this.ausenciaSeleccionada?.id) {
      this.ausenciaService
        .delete(this.ausenciaSeleccionada.id)
        .subscribe(() => {
          // Quitar del array local
          this.ausencias = this.ausencias.filter(
            (ausencia) => ausencia.id !== this.ausenciaSeleccionada?.id
          );
          this.cancelarEliminacion(); // Cierra modal
        });
    }
  }
}
