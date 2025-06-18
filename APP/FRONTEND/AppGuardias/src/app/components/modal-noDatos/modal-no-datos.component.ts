import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-no-datos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-no-datos.component.html',
  styleUrl: './modal-no-datos.component.css'
})
export class ModalNoDatosComponent {

  // Variable para controlar la visualización del modal
  modalNoDatosActivo: boolean = false;

  mostrarModal() {
    this.modalNoDatosActivo = true;
  }

  cerrarModal() {
    this.modalNoDatosActivo = false;
  }

}
