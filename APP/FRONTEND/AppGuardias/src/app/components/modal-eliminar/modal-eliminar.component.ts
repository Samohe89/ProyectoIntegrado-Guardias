import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-eliminar',
  imports: [CommonModule],
  templateUrl: './modal-eliminar.component.html',
  styleUrl: './modal-eliminar.component.css'
})
export class ModalEliminarComponent {

  // Variable para controlar la visualización del modal
  modalEliminarActivo: boolean = false;


  // Evento que se manda al componente padre para confirmar (o no) la eliminación
  @Output() eliminar = new EventEmitter<boolean>();

  mostrarModal() {
    this.modalEliminarActivo = true;
  }

  cerrarModal() {
    this.modalEliminarActivo = false;
  }


  // Método para confirmar la operación
  confirmarEliminar(): void {
    this.eliminar.emit(true);
    this.cerrarModal();
  }

  // Método para cancelar la operación
  cancelarEliminar(): void {
    this.eliminar.emit(false);
    this.cerrarModal();
  }

}



