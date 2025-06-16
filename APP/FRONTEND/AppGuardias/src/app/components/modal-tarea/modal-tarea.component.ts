import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Ausencia } from '../../services/ausencia.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AusenciaService } from '../../services/ausencia.service';
import { ModalEliminarComponent } from '../modal-eliminar/modal-eliminar.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-modal-tarea',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalEliminarComponent],
  templateUrl: './modal-tarea.component.html',
  styleUrl: './modal-tarea.component.css',
})
export class ModalTareaComponent {
  @Input() ausencia: Ausencia | null = null;
  @Output() tareaGuardada = new EventEmitter<Ausencia>();
  @ViewChild('modalEliminar') modalEliminar!: ModalEliminarComponent;

  constructor(
    private ausenciaService: AusenciaService,
    private sanitizer: DomSanitizer
  ) {}

  private objectUrl: string | null = null;

  editable: boolean = false;

  // Controla la visualización del modal
  modalTareaActivo: boolean = false;
  tieneContenido: boolean = false;

  // Texto de la tarea y archivo adjunto
  tareaTexto: string = '';
  archivoAdjunto: File | null = null;
  pdfUrl: SafeResourceUrl | null = null;

  // Mostrar modal (y copiar valores de la ausencia)
  mostrarModal(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService
      .getById(this.ausencia.id)
      .subscribe((ausenciaCompleta) => {
        this.ausencia = ausenciaCompleta;
        this.tareaTexto = this.ausencia.tarea ?? '';
        this.modalTareaActivo = true;
        this.editable = false;
        this.tieneContenido = !!this.ausencia.tarea;
        this.cargarPdf();
      });
  }

  cargarPdf(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService.cargarFicheroTarea(this.ausencia.id).subscribe({
      next: (response) => {
        if (this.objectUrl) {
          URL.revokeObjectURL(this.objectUrl);
        }

        if (response.body && response.body.size > 0) {
          const blob = new Blob([response.body], { type: 'application/pdf' });
          const fileName = `tarea_${this.ausencia?.id}.pdf`;
          this.archivoAdjunto = new File([blob], fileName, {
            type: 'application/pdf',
          });

          this.objectUrl = URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.objectUrl
          );
          this.tieneContenido = true;
        } else {
          // No hay contenido en el cuerpo
          this.pdfUrl = null;
          this.archivoAdjunto = null;
        }
      },
      error: (err) => {
        if (err.status === 404) {
          // Archivo no encontrado: no pasa nada, solo limpiamos variables
          console.warn('No hay PDF asociado para esta tarea.');
        } else {
          // Otros errores sí pueden ser más graves
          console.error('Error inesperado al cargar PDF:', err);
        }
        this.pdfUrl = null;
        this.archivoAdjunto = null;
      },
    });
  }

  // Cerrar modal y limpiar archivo
  cerrarModal(): void {
    this.modalTareaActivo = false;
    this.archivoAdjunto = null;
    this.tareaTexto = '';
    this.tieneContenido = false;

    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
      this.pdfUrl = null;
    }
  }

  // Adjuntar archivo
  adjuntarArchivo(event: Event): void {
    if (this.tieneContenido && !this.editable) {
      alert(
        'Ya tienes un PDF insertado, por favor elimine o modifique la tarea'
      );
      (event.target as HTMLInputElement).value = '';
      return;
    }

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoAdjunto = input.files[0];
      this.tieneContenido = true;
    }
  }

  eliminarTarea() {
  if (!this.ausencia) return;

  this.ausenciaService.eliminarTarea(this.ausencia.id!).subscribe({
    next: (ausenciaActualizada) => {
      this.ausencia = ausenciaActualizada;
      this.tareaGuardada.emit(ausenciaActualizada); // EMITIR CAMBIO AL PADRE
      this.cargarPdf();  // Para actualizar el PDF mostrado
      this.tareaTexto = ''; 
      this.tieneContenido = false;
      this.editable = false;
      // Opcional: cerrar modal o mostrar mensaje
    },
    error: (err) => {
      console.error('Error al borrar tarea:', err);
    },
  });
}

  activarEdicion() {
    this.editable = true;
  }

  modificarTarea(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService
      .modificarTarea(this.ausencia.id, this.tareaTexto)
      .subscribe({
        next: (ausenciaActualizada) => {
          this.tareaTexto = ausenciaActualizada.tarea;
          this.ausencia!.tarea = ausenciaActualizada.tarea;
          this.tareaGuardada.emit(ausenciaActualizada);
          // Opcional: mostrar mensaje de éxito o cerrar modal
        },
        error: (err) => {
          console.error('Error al modificar tarea:', err);
        },
      });
  }

  borrarFichero() {
    if (!this.editable) return; // no permitir si no está editable
    this.modalEliminar.mostrarModal();
  }

  confirmarTarea(): void {
    if (!this.ausencia || this.ausencia.id == null) return;

    const formData = new FormData();
    formData.append('idAusencia', this.ausencia.id.toString());
    formData.append('tareaTexto', this.tareaTexto);

    if (this.archivoAdjunto) {
      formData.append('archivo', this.archivoAdjunto);
    }

    this.ausenciaService.subirTarea(formData).subscribe({
      next: () => {
        this.tieneContenido = true;
        this.cargarPdf(); // actualizar PDF visible tras guardar
        if (this.ausencia !== null) {
          this.tareaGuardada.emit(this.ausencia);
        }
        this.archivoAdjunto = null;
        this.editable = false; // bloqueamos otra vez tras guardar
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al guardar tarea:', err);
      },
    });
  }

  confirmEliminar(confirmado: boolean) {
    if (!confirmado) return;
    if (!this.ausencia?.id) return;

    // Primero eliminar fichero
    this.ausenciaService
      .eliminarFicheroTarea(this.ausencia.id)
      .pipe(
        // Cuando termine, borrar tarea con texto vacío
        switchMap(() =>
          this.ausenciaService.modificarTarea(this.ausencia!.id!, '')
        )
      )
      .subscribe({
        next: (ausenciaActualizada) => {
          // Limpiar variables locales para reflejar que está borrado
          if (this.objectUrl) {
            URL.revokeObjectURL(this.objectUrl);
            this.objectUrl = null;
          }
          this.pdfUrl = null;
          this.archivoAdjunto = null;
          this.tareaTexto = '';
          this.ausencia!.tarea = '';
          this.tareaGuardada.emit(ausenciaActualizada);
          this.tieneContenido = false;
          this.editable = false;
        },
        error: (err) => {
          console.error('Error al eliminar fichero y tarea:', err);
          // Aquí podrías mostrar un mensaje al usuario, si quieres
        },
      });
  }
}
