import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.css'
})
export class ModalInfoComponent {

  // Variable para controlar la visualización del modal
  modalInfoActivo: boolean = false;

  mostrarModal() {
    this.modalInfoActivo = true;
  }

  cerrarModal() {
    this.modalInfoActivo = false;
  }

}
