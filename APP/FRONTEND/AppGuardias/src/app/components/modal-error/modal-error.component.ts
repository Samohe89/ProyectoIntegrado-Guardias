import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-error',
  imports: [CommonModule],
  templateUrl: './modal-error.component.html',
  styleUrl: './modal-error.component.css'
})

export class ModalErrorComponent {

  // Emite un evento cuando se cierra el modal
  @Output() modalCerrado = new EventEmitter<void>();

  // Variable para controlar la visualización del modal
  modalErrorActivo: boolean = false;

  // Variable para controlar el mensaje que muestra
  mensajeError: string = '';

  mostrarModal() {
    this.modalErrorActivo = true;
  }

  cerrarModal() {
    this.modalErrorActivo = false;
    // Emite el evento al cerrar el modal
    this.modalCerrado.emit();
  }

}
