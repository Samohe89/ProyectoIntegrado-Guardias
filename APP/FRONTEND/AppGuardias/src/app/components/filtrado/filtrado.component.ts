import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Profesor } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-filtrado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})

export class FiltradoComponent {
  // Controla si se debe ocultar el select de profesores
  @Input() ocultarSelectProfesor: boolean = false;

  // Array de profesores para mostrar en el select
  profesores: Profesor[] = [];

  // Variables del formulario de filtrado
  fechaDesde: string = '';
  fechaHasta: string = '';
  profesorFiltro: string | null = null;


  // Variables de validación de criterios de filtrado
  faltanCriterios: boolean = false;
  faltanFechas: boolean = false;
  fechasErroneas: boolean = false;


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


  onSubmit(form: NgForm): void {
    this.faltanCriterios = false;
    this.faltanFechas = false;
    this.fechasErroneas = false;

    if (!this.fechaDesde && !this.fechaHasta && this.profesorFiltro == null) {
      this.faltanCriterios = true;
    } else if ((this.fechaDesde && !this.fechaHasta) || (!this.fechaDesde && this.fechaHasta)) {
      this.faltanFechas = true;
    } else if (this.fechaDesde && this.fechaHasta && this.fechaDesde > this.fechaHasta) {
      this.fechasErroneas = true;
    } else {
      this.aplicarFiltros();
    }

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

  // Método para resetear las variables de validacion
  resetValidacion(): void {
    if (this.fechaDesde || this.fechaHasta) {
      this.faltanFechas = false;
      this.fechasErroneas = false;
    }

    if (this.fechaDesde || this.fechaHasta || this.profesorFiltro) {
      this.faltanCriterios = false;
    }
  }
}
