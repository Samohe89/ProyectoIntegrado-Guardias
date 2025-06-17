import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ausencia, AusenciaService } from '../../services/ausencia.service';


@Component({
  selector: 'app-detalles-guardia',
  imports: [CommonModule],
  templateUrl: './detalles-guardia.component.html',
  styleUrl: './detalles-guardia.component.css',
  providers: [AusenciaService]
})


export class DetallesGuardiaComponent {

  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  // Variable que almacena la ausencia correspondiente (la recibe del padre)
  idAusencia!: number;

  // Variable que almacena el objeto ausencia completo
  ausencia?: Ausencia;

  // Variable que controla si existe fichero adjunto o no
  existeFichero: boolean = false;

  // Variable que almacena el nombre del fichero
  nombreFichero: string = "";



  constructor(
    private ausenciaService: AusenciaService
  ) { }


  // Cargar ausencia
  cargarAusencia(idAusencia: number): void {
    this.ausenciaService.getById(idAusencia).subscribe({
      next: (data) => {
        this.idAusencia = idAusencia;
        this.ausencia = data;
        console.log("Ausencia cargada: ", this.ausencia);
        this.cargarNombreFichero();
      },
      error: (error) => {
        console.error("Error al cargar ausencia:", error);
      }
    });
  }

  // Cargar nombre fichero
  cargarNombreFichero(): void {
    this.ausenciaService.cargarFicheroTarea(this.idAusencia).subscribe({
      next: (resp) => {
        // Se almacena el fichero, que es lo que se manda en el cuerpo de la respuesta del backend
        const fichero = resp.body!;
        // Se almacena la cabecera que contiene el el nombre del archivo
        const cabeceraRespuesta = resp.headers.get('Content-Disposition');
        console.log("cabecera back: ", cabeceraRespuesta);

        // Indica un nombre por defecto, si no lo consigue extraer
        this.nombreFichero = 'tarea.pdf';
        this.existeFichero = true;

        // Si la cabecera existe
        if (cabeceraRespuesta) {
          // Captura el filename enviado por el backend buscando el patrón [.match(expresión regular)]
          const filename = cabeceraRespuesta.match(/filename="(.+?)"/);
          // Esto devuelve la coincidencia completa (filename[0]) y solo la parte capturada (.+?) (filename [1])
          if (filename && filename[1]) {
            this.nombreFichero = filename[1];
            console.log("nombre fichero: ", this.nombreFichero)
          }
        }
      },
      error: (error) => {
      if (error.status === 404) {
        console.warn('No hay fichero adjunto para esta ausencia.');
      } else {
        console.error('Error al cargar el fichero:', error);
      }
      this.existeFichero = false; 
    }
    })
  }

  // Cargar PDF
  cargarPDF(): void {
    this.ausenciaService.cargarFicheroTarea(this.idAusencia).subscribe({
      next: (resp) => {
        // Se almacena el fichero, que es lo que se manda en el cuerpo de la respuesta del backend
        const fichero = resp.body!;

        // Crear URL del fichero y forzar descarga con nombre correcto
        const url = URL.createObjectURL(fichero);
        
        window.open(url);
        
        // Crea un enlace ficticio de descarga
        const a = document.createElement('a');
        a.href = url;
        a.download = this.nombreFichero;
        a.click();
        URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al cargar el PDF:', err);
        alert('No se pudo cargar el archivo PDF asociado.');
      }
    });
  }


  cerrarModal() {
    this.modalActivo = false;
  }
}
