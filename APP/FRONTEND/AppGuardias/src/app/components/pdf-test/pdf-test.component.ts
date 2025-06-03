import { Component } from '@angular/core';
import { PdfGeneratorService } from '../../services/pdf-generator.service';

@Component({
  selector: 'app-pdf-test',
  imports: [],
  templateUrl: './pdf-test.component.html',
  styleUrl: './pdf-test.component.css'
})
export class PdfTestComponent {
  constructor(private pdfService: PdfGeneratorService) { }

  generarPdf() {
    const titulo = 'Informe de Guardias';
    const filtros = {
      'Fecha desde': '2025-01-01',
      'Fecha hasta': '2025-06-01',
      'Profesor': 'Todos'
    };
    const headers = ['Nombre', 'Horas de Guardia', 'Fecha'];
    const data = [
      ['Juan Pérez', 12, '2025-05-15'],
      ['Ana López', 8, '2025-05-10'],
      ['Luis Martínez', 10, '2025-05-20'],
    ];
    const nombreArchivo = 'guardias.pdf';

    this.pdfService.generarPdfTabla(titulo, filtros, headers, data, nombreArchivo);
  }
}
