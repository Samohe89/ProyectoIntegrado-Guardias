import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ausencia, AusenciaService } from '../../services/ausencia.service';


@Component({
  selector: 'app-detalles-guardia',
  imports: [CommonModule],
  templateUrl: './detalles-guardia.component.html',
  styleUrl: './detalles-guardia.component.css',
  providers: [AusenciaService]
})


export class DetallesGuardiaComponent {

  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  // Variable que almacena la ausencia correspondiente (la recibe del padre)
  idAusencia!: number;

  // Variable que almacena el objeto ausencia completo
  ausencia?: Ausencia;

  constructor(
    private ausenciaService: AusenciaService
  ) { }


  // Cargar ausencia
  cargarAusencia(idAusencia: number): void {
    this.ausenciaService.getById(idAusencia).subscribe({
      next: (data) => {
        this.ausencia = data;
        console.log("Ausencia cargada: ", this.ausencia);
      },
      error: (error) => {
        console.error("Error al cargar ausencia:", error);
      }
    });
  }



  cerrarModal() {
    this.modalActivo = false;
  }
}
