import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-no-editado',
  imports: [CommonModule],
  templateUrl: './modal-no-editado.component.html',
  styleUrl: './modal-no-editado.component.css'
})

export class ModalNoEditadoComponent {

  // Emite un evento cuando se cierra el modal
  @Output() modalCerrado = new EventEmitter<void>();

  // Variable para controlar la visualización del modal
  modalNoEditadoActivo: boolean = false;

  mostrarModal() {
    this.modalNoEditadoActivo = true;
  }

  cerrarModal() {
    this.modalNoEditadoActivo = false;
    // Emite el evento al cerrar el modal
    this.modalCerrado.emit();
  }

}
