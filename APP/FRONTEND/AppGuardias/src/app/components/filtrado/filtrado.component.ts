import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profesor } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})

export class FiltradoComponent {
  @Input() profesores: Profesor[] = [];

  fechaDesde: string = '';
  fechaHasta: string = '';
  profesorFiltro: string = '';

  @Output() filtrosAplicados = new EventEmitter<{
    fechaDesde: string;
    fechaHasta: string;
    profesor: string;
  }>();

  aplicarFiltros() {
    this.filtrosAplicados.emit({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
      profesor: this.profesorFiltro,
    });

    this.fechaDesde = '';
    this.fechaHasta = '';
    this.profesorFiltro = '';
  }
}