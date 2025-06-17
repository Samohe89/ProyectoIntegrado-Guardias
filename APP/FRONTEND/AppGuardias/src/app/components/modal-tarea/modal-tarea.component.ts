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
import { ModalInfoComponent } from '../modal-info/modal-info.component';
import { ModalNoDatosComponent } from '../modal-noDatos/modal-no-datos.component';

@Component({
  selector: 'app-modal-tarea',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ModalEliminarComponent,
    ModalBorradoComponent,
    ModalRegistroComponent,
    ModalInfoComponent,
    ModalNoDatosComponent,
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
  @ViewChild('modalInfo') modalInfo!: ModalInfoComponent;
  @ViewChild('modalNoDatos') modalNoDatos!: ModalNoDatosComponent;
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
        this.cargarPdf();
        this.establecerEstado(this.hayTarea, this.hayFichero);
      });
  }

  establecerEstado(hayTarea: boolean, hayFichero: boolean): void {
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
        }
      },
      error: (err) => {
        if (err.status === 404) {
          // Archivo no encontrado: no pasa nada, solo limpiamos variables
          console.log('No hay PDF asociado para esta tarea.');
        } else {
          // Otros errores sí pueden ser más graves
          console.log('Error inesperado al cargar PDF:');
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

    if (input.files && input.files.length > 0) {
      this.archivoAdjunto = input.files[0];
      this.pdfUrl = null; // Borra vista previa si es un nuevo archivo local
      this.hayFichero = true;

      input.value = '';
    }
  }

  eliminarTarea() {
    if (
      !this.ausencia ||
      this.ausencia.id == null ||
      ((this.tareaTexto.trim() === '' ||
        this.tareaTexto === null ||
        this.tareaTexto === undefined) &&
        (this.pdfUrl === '' ||
          this.pdfUrl === null ||
          this.pdfUrl === undefined))
    )
      return this.modalNoDatos.mostrarModal();
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
        },
        error: (err) => {
          console.error('Error al modificar tarea:', err);
        },
      });
  }

  abrirModalConfirmacion() {
    this.eliminarSoloFichero = true;
    this.modalEliminar.mostrarModal();
  }

  borrarArchivo(): void {}

  confirmarTarea(): void {
    if (
      !this.ausencia ||
      this.ausencia.id == null ||
      ((this.tareaTexto.trim() === '' ||
        this.tareaTexto === null ||
        this.tareaTexto === undefined) &&
        (this.pdfUrl === '' ||
          this.pdfUrl === null ||
          this.pdfUrl === undefined))
    )
      return this.modalInfo.mostrarModal();

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
    if (!confirmado || !this.ausencia?.id) return;

    if (this.eliminarSoloFichero) {
      if (!this.hayFichero) {
        if (this.fileInput && this.fileInput.nativeElement) {
          this.fileInput.nativeElement.value = ''; // <-- Limpia input file HTML
          this.establecerEstado(this.hayTarea, false);
          setTimeout(() => {
            this.modalBorrado.mostrarModal();
          }, 300);
          this.recargarAusencia();
        }
      } else {
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
      },
      error: (err) => {
        console.error('Error al recargar ausencia:', err);
      },
    });
  }
}
