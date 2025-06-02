import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profesor } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})

export class FiltradoComponent {
  // Array de profesores para mostrar en el select
  profesores: Profesor[] = [];

  // Variables del formulario de filtrado
  fechaDesde: string = '';
  fechaHasta: string = '';
  profesorFiltro: string | null = null;

  // Evento que se emitirá al componente padre, enviando las variables de filtrado
  @Output() filtrosAplicados = new EventEmitter<{
    fechaDesde: string;
    fechaHasta: string;
    profesorFiltro: string | null;
  }>();

  constructor(
      private profesorService: ProfesorService
    ) { }

    
  ngOnInit(): void {
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });
  }

  // Método que aplica el valor de las variables de filtrado
  aplicarFiltros() {
    this.filtrosAplicados.emit({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      profesorFiltro: this.profesorFiltro,
    });

    // Posible limpieza del formulario de filtrado
    /*
    this.fechaDesde = '';
    this.fechaHasta = '';
    this.profesor= '';
    */
  }
}