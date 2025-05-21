import { Component, OnInit } from '@angular/core';
import { Ausencia, AusenciaService } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listado-ausencias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listado-ausencias.component.html',
  styleUrl: './listado-ausencias.component.css',
})
export class ListadoAusenciasComponent implements OnInit {
  ausencias: Ausencia[] = [];
  todasLasAusencias: Ausencia[] = [];
  ausenciasFiltro: Ausencia[] = [];

  mostrarModal: boolean = false;
  ausenciaSeleccionada: Ausencia | null = null;

  usuario: { rol: string; dniProfesor: string; cursoAcademico: string } | null =
    null;

  dniProfesorLogueado: string = '';

  //Filtrado
  fechaDesde: string = '';
  fechaHasta: string = '';
  profesorFiltro: string = '';

  constructor(private ausenciaService: AusenciaService) {}

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

        if (usuario.rol === 'Profesor') {
          const ausenciasFiltradas = data.filter(
            (ausencia) =>
              ausencia.profesor?.id?.dniProfesor === this.dniProfesorLogueado
          );
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

  aplicarFiltros() {
    let filtradas = this.todasLasAusencias;

    if (this.fechaDesde) {
      const desde = new Date(this.fechaDesde);
      desde.setHours(0, 0, 0, 0);
      filtradas = filtradas.filter((a) => new Date(a.fechaAusencia) >= desde);
    }

    if (this.fechaHasta) {
      const hasta = new Date(this.fechaHasta);
      hasta.setHours(23, 59, 59, 999);
      filtradas = filtradas.filter((a) => new Date(a.fechaAusencia) <= hasta);
    }

    if (this.profesorFiltro.trim()) {
      const nombre = this.profesorFiltro.trim().toLowerCase();
      filtradas = filtradas.filter((a) =>
        a.profesor?.nombreProfesor?.toLowerCase().includes(nombre)
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
            (a) => a.id !== this.ausenciaSeleccionada?.id
          );
          this.cancelarEliminacion(); // Cierra modal
        });
    }
  }
}
