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
    const titulo = 'AUSENCIAS Y GUARDIAS';
    const subtitulo = 'TOTAL DE HORAS DE GUARDIA';
    const filtros = {
      'Fecha desde': 'dd/mm/yyyy',
      'Fecha hasta': 'dd/mm/yyyy',
    };
    const headers = ['Profesor', 'Total Horas'];
    const data = [
      ['Juan Pérez', 12.00],
      ['Ana López', 8.00],
      ['Luis Martínez', 10.50],
    ];
    const nombreArchivo = 'guardias.pdf';

    this.pdfService.generarPdfTabla(subtitulo, filtros, headers, data, nombreArchivo);
  }
}
