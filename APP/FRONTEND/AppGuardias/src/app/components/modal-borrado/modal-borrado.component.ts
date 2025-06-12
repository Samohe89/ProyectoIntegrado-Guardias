import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-borrado',
  imports: [CommonModule],
  templateUrl: './modal-borrado.component.html',
  styleUrl: './modal-borrado.component.css'
})
export class ModalBorradoComponent {

  // Variable para controlar la visualización del modal
  modalBorradoActivo: boolean = false;
 

  mostrarModal() {
    this.modalBorradoActivo = true;
  }

  cerrarModal() {
    this.modalBorradoActivo = false;
  }

}

