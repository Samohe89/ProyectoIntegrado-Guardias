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
        this.idAusencia = idAusencia;
        this.ausencia = data;
        console.log("Ausencia cargada: ", this.ausencia);
      },
      error: (error) => {
        console.error("Error al cargar ausencia:", error);
      }
    });
  }

  // Cargar PDF
  cargarPDF(): void {  
    this.ausenciaService.cargarFicheroTarea(this.idAusencia).subscribe({
      next: (blob: Blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        console.error('Error al cargar el PDF:', err);
      }
    });
  }


  cerrarModal() {
    this.modalActivo = false;
  }
}
