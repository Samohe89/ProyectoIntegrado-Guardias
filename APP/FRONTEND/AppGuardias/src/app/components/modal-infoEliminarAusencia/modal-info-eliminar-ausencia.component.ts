import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-info-eliminar-ausencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-info-eliminar-ausencia.component.html',
  styleUrl: './modal-info-eliminar-ausencia.component.css'
})
export class ModalInfoEliminarAusenciaComponent {

  // Variable para controlar la visualización del modal
  modalInfoEliminarAusenciaActivo: boolean = false;

  mostrarModal() {
    this.modalInfoEliminarAusenciaActivo = true;
  }

  cerrarModal() {
    this.modalInfoEliminarAusenciaActivo = false;
  }

}
