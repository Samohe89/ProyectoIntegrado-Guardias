import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-error',
  imports: [CommonModule],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})

export class ModalErrorComponent {

  // Variable para controlar la visualización del modal
  modalErrorActivo: boolean = false;

  // Variable para controlar el mensaje que muestra
  mensajeError: string = '';

  mostrarModal() {
    this.modalErrorActivo = true;
  }

  cerrarModal() {
    this.modalErrorActivo = false;
  }

}