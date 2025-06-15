import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ausencia } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-tarea',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './modal-tarea.component.html',
  styleUrl: './modal-tarea.component.css'
})
export class ModalTareaComponent {
  @Input() ausencia: Ausencia | null = null;
  @Output() tareaGuardada = new EventEmitter<Ausencia>();

  mostrarModalDetalles: boolean = false;
  tareaTexto: string | null = null;
  archivoAdjunto: File | null = null;

  abrirModalDetalles(ausencia: Ausencia | null) {
    if (ausencia) {
      this.ausencia = ausencia;
      this.tareaTexto = ausencia.tarea ?? '';
      this.mostrarModalDetalles = true;
    }
  }

  cancelarModal() {
    this.mostrarModalDetalles = false;
    this.archivoAdjunto = null;
  }

  confirmarTarea() {
    if (this.ausencia) {
      this.ausencia.tarea = this.tareaTexto ?? '';
      this.tareaGuardada.emit(this.ausencia);
      this.mostrarModalDetalles = false;
    }
  }

  adjuntarArchivo(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.archivoAdjunto = input.files[0];
    }
  }

  eliminarArchivo() {
    this.archivoAdjunto = null;
  }

  modificarTarea() {
    // Aquí puedes activar un modo de edición si lo deseas
  }

  eliminarTareaTexto() {
    this.tareaTexto = '';
  }
}
