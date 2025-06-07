import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasGuardiaService, ProfesorTotalHorasGuardiaDTO } from '../../services/horasGuardia.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';
import { FiltradoAdaptadoHorasProfesorComponent } from '../filtrado-adaptado-horas-profesor/filtrado-adaptado-horas-profesor.component';

@Component({
  selector: 'app-horas-guardia',
  standalone: true,
  imports: [CommonModule, FiltradoComponent, FiltradoAdaptadoHorasProfesorComponent],
  templateUrl: './horas-guardia.component.html',
  styleUrl: './horas-guardia.component.css'
})
export class HorasGuardiaComponent implements OnInit{

  profesoresConHoras: ProfesorTotalHorasGuardiaDTO[] = [];

  fechaDesde?: Date | null = null;
  fechaHasta?: Date | null = null;

  rolUsuario: string = '';
  dniProfesor: string = '';

  esProfesor: boolean = false;
  esEquipoDirectivo: boolean = false;

  constructor(private horasGuardiaService: HorasGuardiaService) {}

  ngOnInit(): void {
    const usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.rolUsuario = usuario.rol;
      this.dniProfesor = usuario.dniProfesor;

      this.esProfesor = this.rolUsuario.toLowerCase() === 'profesor';
      this.esEquipoDirectivo = this.rolUsuario.toLowerCase() === 'equipo directivo';
    }

    // NO cargamos datos aquí para que la tabla esté vacía al inicio
  }

  cargarDatos(fechaDesde?: string, fechaHasta?: string, profesorFiltro?: string | null): void {
    let profesorFinal: string | null = null;
    let perfil: 'profesor' | 'directivo' = 'directivo'; // Por defecto

    if (this.esProfesor) {
      // Siempre filtrar por dni del profesor logueado
      profesorFinal = this.dniProfesor;
      perfil = 'profesor';
    } else if (profesorFiltro && profesorFiltro.trim() !== '' && profesorFiltro.toLowerCase() !== 'null') {
      profesorFinal = profesorFiltro.trim();
    }

    this.horasGuardiaService.getTotalHorasPorProfesor(fechaDesde, fechaHasta, profesorFinal, perfil)
      .subscribe({
        next: data => {
          this.profesoresConHoras = data;
          this.fechaDesde = fechaDesde ? new Date(fechaDesde) : null;
          this.fechaHasta = fechaHasta ? new Date(fechaHasta) : null;
        },
        error: err => {
          console.error('Error al obtener las horas de guardia:', err);
          this.profesoresConHoras = [];
        }
      });
  }

  onFiltrosAplicados(filtros: { fechaDesde: string, fechaHasta: string, profesorFiltro?: string | null }): void {
  if (this.esProfesor) {
    // Forzar filtro solo para el profesor logueado
    this.cargarDatos(filtros.fechaDesde, filtros.fechaHasta, this.dniProfesor);
  } else {
    // Para directivo o resto, usar filtro tal cual viene
    this.cargarDatos(filtros.fechaDesde, filtros.fechaHasta, filtros.profesorFiltro ?? null);
  }
}
}
