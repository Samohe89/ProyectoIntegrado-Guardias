import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-registro.component.html',
  styleUrl: './modal-registro.component.css'
})
export class ModalRegistroComponent {

  // Variable para controlar la visualización del modal
  modalActivo: boolean = false;

  mostrarModal() {
    this.modalActivo = true;
  }

  cerrarModal() {
    this.modalActivo = false;
  }

}
