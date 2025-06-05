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
    const headers = ['Profesor', 'Total Horas'];
    const data = [
      ['Juan Pérez', 12],
      ['Ana López', 8],
      ['Luis Martínez'],
    ];
    const nombreArchivo = 'guardias.pdf';

    this.pdfService.generarPdfTabla(titulo, filtros, headers, data, nombreArchivo);
  }
}
