import {
  Component,
  ElementRef,
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
import { ModalBorradoComponent } from '../modal-borrado/modal-borrado.component';
import { ModalRegistroComponent } from '../modal-registro/modal-registro.component';

@Component({
  selector: 'app-modal-tarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalEliminarComponent,
    ModalBorradoComponent,
    ModalRegistroComponent,
  ],
  templateUrl: './modal-tarea.component.html',
  styleUrl: './modal-tarea.component.css',
})
export class ModalTareaComponent {
  @Input() ausencia: Ausencia | null = null;
  @Output() tareaGuardada = new EventEmitter<Ausencia>();
  @ViewChild('modalEliminar') modalEliminar!: ModalEliminarComponent;
  @ViewChild('modalBorrado') modalBorrado!: ModalBorradoComponent;
  @ViewChild('modalRegistro') modalRegistro!: ModalRegistroComponent;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private ausenciaService: AusenciaService,
    private sanitizer: DomSanitizer
  ) {}

  private objectUrl: string | null = null;
  private eliminarSoloFichero = false;

  puedeEditarTexto: boolean = false;
  puedeAdjuntarArchivo: boolean = false;

  modalTareaActivo: boolean = false;
  hayTarea: boolean = false;

  tareaTexto: string = '';
  archivoAdjunto: File | null = null;
  pdfUrl: SafeResourceUrl | null = null;
  hayFichero: boolean = false;

  // Mostrar modal (y copiar valores de la ausencia)
  mostrarModal(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService
      .getById(this.ausencia.id)
      .subscribe((ausenciaCompleta) => {
        this.ausencia = ausenciaCompleta;
        this.tareaTexto = this.ausencia.tarea ?? '';
        this.modalTareaActivo = true;
        this.hayTarea = !!this.ausencia.tarea;
        this.hayFichero = !!this.ausencia.fichero;
        console.log('1Hay tarea:', this.hayTarea);
        console.log('1Hay fichero:', this.hayFichero);
        this.cargarPdf();
        this.establecerEstado(this.hayTarea, this.hayFichero);
      });
    console.log('ausencia:', this.ausencia);
  }

  establecerEstado(hayTarea: boolean, hayFichero: boolean): void {
    console.log('establecerEstado - hayTarea:', hayTarea);
    console.log('establecerEstado - hayFichero:', hayFichero);
    this.puedeEditarTexto = !hayTarea && hayFichero;
    this.puedeAdjuntarArchivo = !hayFichero && hayTarea;

    if (!hayTarea && !hayFichero) {
      this.puedeEditarTexto = true;
      this.puedeAdjuntarArchivo = true;
    }
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
          this.hayFichero = true;
          console.log('2Hay tarea:', this.hayTarea);
          console.log('2Hay fichero:', this.hayFichero);
        }
        //  else {
        //   // No hay contenido en el cuerpo
        //   this.pdfUrl = null;
        //   this.archivoAdjunto = null;
        // }
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

  descargarPdf(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService.cargarFicheroTarea(this.ausencia.id).subscribe({
      next: (response) => {
        if (response.body && response.body.size > 0) {
          const blob = new Blob([response.body], { type: 'application/pdf' });
          const objectUrl = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = objectUrl;
          a.download = `tarea_${this.ausencia?.id}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

          setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
        }
      },
      error: (err) => {
        console.error('Error al descargar PDF:', err);
      },
    });
  }

  // Cerrar modal y limpiar archivo
  cerrarModal(): void {
    this.modalTareaActivo = false;
  }

  //Adjuntar archivo
  adjuntarArchivo(event: Event): void {
    const input = event.target as HTMLInputElement;

    // if (!this.puedeAdjuntarArchivo) {
    //   alert('No puedes adjuntar archivo mientras haya PDF o no haya tarea.');
    //   input.value = '';
    //   return;
    // }

    console.log('entrada de adjuntar archivo:', input.files);
    if (input.files && input.files.length > 0) {
      this.archivoAdjunto = input.files[0];
      this.pdfUrl = null; // Borra vista previa si es un nuevo archivo local
      this.hayFichero = true;

      input.value = '';
    }
  }

  eliminarTarea() {
    this.eliminarSoloFichero = false;
    this.modalEliminar.mostrarModal();
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

  abrirModalConfirmacion() {
    this.eliminarSoloFichero = true;
    console.log('3Hay tarea:', this.hayTarea);
    console.log('3Hay fichero:', this.hayFichero);
    this.modalEliminar.mostrarModal();
  }

  borrarArchivo(): void {}

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
        this.hayTarea = true;
        this.cargarPdf(); // actualizar PDF visible tras guardar
        if (this.ausencia !== null) {
          this.tareaGuardada.emit(this.ausencia);
        }
        this.archivoAdjunto = null;
        setTimeout(() => {
          this.modalRegistro.mostrarModal();
        }, 300);
        this.cerrarModal();
      },
      error: (err) => {
        console.error('Error al guardar tarea:', err);
      },
    });
  }

  confirmEliminar(confirmado: boolean) {
    console.log('Confirmar eliminar:', confirmado);
    console.log('Eliminar solo fichero:', this.eliminarSoloFichero);
    console.log('4Hay tarea:', this.hayTarea);
    console.log('4Hay fichero:', this.hayFichero);
    if (!confirmado || !this.ausencia?.id) return;

    if (this.eliminarSoloFichero) {
      console.log('Eliminando solo fichero.');
      if (!this.hayFichero) {
        console.log('5Hay tarea:', this.hayTarea);
        console.log('5Hay fichero:', this.hayFichero);
        console.log('NEliminando fichero no adjunto.');
        if (this.fileInput && this.fileInput.nativeElement) {
          this.fileInput.nativeElement.value = ''; // <-- Limpia input file HTML
          this.establecerEstado(this.hayTarea, false);
          setTimeout(() => {
            this.modalBorrado.mostrarModal();
          }, 300);
          this.recargarAusencia();
        }
      } else {
        console.log('Eliminando fichero adjunto.');
        this.ausenciaService.eliminarFichero(this.ausencia.id).subscribe({
          next: () => {
            this.pdfUrl = null;
            this.archivoAdjunto = null;
            this.hayFichero = false;
            this.establecerEstado(this.hayTarea, false);
            setTimeout(() => {
              this.modalBorrado.mostrarModal();
            }, 300);
            this.recargarAusencia(); // <-- aquí recargamos sin cerrar modal
          },
          error: (err) => {
            console.error('Error al eliminar fichero:', err);
          },
        });
      }
    } else {
      console.log('Eliminando tarea y fichero. aMAMAMAMAMAMARLAAA');
      this.ausenciaService.eliminarTarea(this.ausencia.id).subscribe({
        next: () => {
          // Si hay fichero, también lo eliminamos
          if (this.hayFichero && this.ausencia?.id != null) {
            this.ausenciaService.eliminarFichero(this.ausencia.id).subscribe({
              next: () => {
                if (this.objectUrl) {
                  URL.revokeObjectURL(this.objectUrl);
                  this.objectUrl = null;
                }
                this.pdfUrl = null;
                this.archivoAdjunto = null;
                this.tareaTexto = '';
                if (this.ausencia) this.ausencia.tarea = '';
                this.hayFichero = false;
                this.hayTarea = false;
                this.modalEliminar.cerrarModal();
                setTimeout(() => {
                  this.modalBorrado.mostrarModal();
                }, 300);
                this.recargarAusencia();
              },
              error: (err) => {
                console.error('Error al eliminar fichero:', err);
              },
            });
          } else {
            if (this.objectUrl) {
              URL.revokeObjectURL(this.objectUrl);
              this.objectUrl = null;
            }
            this.pdfUrl = null;
            this.archivoAdjunto = null;
            this.tareaTexto = '';
            if (this.ausencia) this.ausencia.tarea = '';
            this.hayFichero = false;
            this.hayTarea = false;
            this.modalEliminar.cerrarModal();
            setTimeout(() => {
              this.modalBorrado.mostrarModal();
            }, 300);
            this.recargarAusencia();
          }
        },
        error: (err) => {
          console.error('Error al eliminar tarea:', err);
        },
      });
    }
  }

  recargarAusencia(): void {
    if (!this.ausencia?.id) return;

    this.ausenciaService.getById(this.ausencia.id).subscribe({
      next: (ausenciaCompleta) => {
        this.ausencia = ausenciaCompleta;
        this.tareaTexto = ausenciaCompleta.tarea ?? '';
        // this.cargarPdf();
        // this.hayTarea = !!this.ausencia.tarea;
        // this.hayFichero = !!this.ausencia.fichero;
        // this.establecerEstado(this.hayTarea, this.hayFichero);
      },
      error: (err) => {
        console.error('Error al recargar ausencia:', err);
      },
    });
  }
}
