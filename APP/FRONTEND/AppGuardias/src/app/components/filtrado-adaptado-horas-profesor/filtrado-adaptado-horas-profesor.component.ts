import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-filtrado-adaptado-horas-profesor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrado-adaptado-horas-profesor.component.html',
  styleUrls: ['./filtrado-adaptado-horas-profesor.component.css']
})
export class FiltradoAdaptadoHorasProfesorComponent {
  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variables del formulario de filtrado
  fechaDesde: string = '';
  fechaHasta: string = '';

  // Variables de validación de criterios de filtrado
  faltanCriterios: boolean = false;
  faltanFechas: boolean = false;
  fechasErroneas: boolean = false;

  // Variables límite para seleccionar fechas
  year = parseInt(this.usuario.cursoAcademico);
  fechaMin = `${this.year}-09-15`;
  fechaMax = `${this.year + 1}-06-20`;

  // Evento que se emitirá al componente padre con los filtros
  @Output() filtrosAplicados = new EventEmitter<{
    fechaDesde: string;
    fechaHasta: string;
  }>();

  onSubmit(form: NgForm): void {
    this.faltanCriterios = false;
    this.faltanFechas = false;
    this.fechasErroneas = false;

    if (!this.fechaDesde && !this.fechaHasta) {
      this.faltanCriterios = true;
    } else if ((this.fechaDesde && !this.fechaHasta) || (!this.fechaDesde && this.fechaHasta)) {
      this.faltanFechas = true;
    } else if (this.fechaDesde && this.fechaHasta && this.fechaDesde > this.fechaHasta) {
      this.fechasErroneas = true;
    } else {
      this.aplicarFiltros();
    }
  }

  aplicarFiltros() {
    this.filtrosAplicados.emit({
      fechaDesde: this.fechaDesde,
      fechaHasta: this.fechaHasta,
    });
  }

  resetValidacion(): void {
    if (this.fechaDesde || this.fechaHasta) {
      this.faltanFechas = false;
      this.fechasErroneas = false;
    }
    if (this.fechaDesde || this.fechaHasta) {
      this.faltanCriterios = false;
    }
  }
}
