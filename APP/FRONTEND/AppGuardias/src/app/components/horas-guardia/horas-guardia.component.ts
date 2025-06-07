import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasGuardiaService, ProfesorTotalHorasGuardiaDTO } from '../../services/horasGuardia.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';


@Component({
  selector: 'app-horas-guardia',
  imports: [CommonModule, FiltradoComponent],
  templateUrl: './horas-guardia.component.html',
  styleUrl: './horas-guardia.component.css'
})
export class HorasGuardiaComponent implements OnInit{

  profesoresConHoras: ProfesorTotalHorasGuardiaDTO[] = [];

  // Fechas en formato Date para usar en el HTML con el pipe 'date'
  fechaDesde?: Date | null = null;
  fechaHasta?: Date | null = null;

  constructor(private horasGuardiaService: HorasGuardiaService) {}

  ngOnInit(): void {}

  cargarDatos(fechaDesde?: string, fechaHasta?: string, profesorFiltro?: string | null): void {
  // Limpiar el filtro de profesor para evitar enviar 'null' o strings vacíos
  let profesorFinal: string | null = null;
  if (profesorFiltro && profesorFiltro.trim() !== '' && profesorFiltro.toLowerCase() !== 'null') {
    profesorFinal = profesorFiltro.trim();
  }

  this.horasGuardiaService.getTotalHorasPorProfesor(fechaDesde, fechaHasta, profesorFinal)
    .subscribe({
      next: data => this.profesoresConHoras = data,
      error: err => console.error('Error al obtener las horas de guardia:', err)
    });
}

  // Guardamos las fechas como Date también para mostrarlas dinámicamente
  onFiltrosAplicados(filtros: { fechaDesde: string, fechaHasta: string, profesorFiltro: string | null }): void {
    this.fechaDesde = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null;
    this.fechaHasta = filtros.fechaHasta ? new Date(filtros.fechaHasta) : null;
    this.cargarDatos(filtros.fechaDesde, filtros.fechaHasta, filtros.profesorFiltro);
  }
}
