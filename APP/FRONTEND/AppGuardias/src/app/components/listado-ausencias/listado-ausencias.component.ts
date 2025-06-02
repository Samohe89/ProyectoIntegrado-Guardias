import { Component, HostListener, OnInit } from '@angular/core';
import {
  Ausencia,
  AusenciaService,
  Profesor,
} from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';
import { FiltroAusenciasComponent } from '../filtrado/filtrado.component';

@Component({
  selector: 'app-listado-ausencias',
  standalone: true,
  imports: [CommonModule, FormsModule, FiltroAusenciasComponent],
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
  }

   aplicarFiltrosDesdeComponente(event: {
    fechaDesde: string;
    fechaHasta: string;
    profesor: string;
  }) {
    let filtradas = this.todasLasAusencias;

    let fechaDesde = event.fechaDesde || new Date().toISOString().split('T')[0];
    const desde = new Date(fechaDesde);
    desde.setHours(0, 0, 0, 0);

    filtradas = filtradas.filter(
      (ausencia) => new Date(ausencia.fechaAusencia) >= desde
    );

    if (event.fechaHasta) {
      const hasta = new Date(event.fechaHasta);
      hasta.setHours(23, 59, 59, 999);
      filtradas = filtradas.filter(
        (ausencia) => new Date(ausencia.fechaAusencia) <= hasta
      );
    }

    if (event.profesor) {
      const nombre = event.profesor.toLowerCase();
      filtradas = filtradas.filter((ausencia) =>
        ausencia.profesor?.nombreProfesor?.toLowerCase().includes(nombre)
      );
    }

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
