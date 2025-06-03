import { Injectable } from "@angular/core";
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

@Injectable({
  providedIn: "root"
})
export class PdfGeneratorService {

  async generarPdfTabla(
    titulo: string,
    filtros: { [key: string]: string },
    headers: string[],
    data: (string | number)[][],
    nombreArchivo: string
  ) {
    const doc = new jsPDF();

    const logoUrl = 'https://www.iesalmudeyne.es/wp-content/uploads/2023/03/logo-ies-almudeyne-black.png';
    let startY = 15;

    try {
      const base64Logo = await this.getBase64ImageFromURL(logoUrl);
      doc.addImage(base64Logo, 'PNG', 14, 10, 20, 20); // Logo en la esquina superior izquierda
    } catch (error) {
      console.warn('No se pudo cargar el logo:', error);
    }

    // Título general centrado arriba
    doc.setFontSize(12);
    doc.setFont('poppins', 'bold');
    doc.text('AUSENCIAS Y GUARDIAS', 105, 20, { align: 'center' });

    // Línea horizontal
    doc.setDrawColor(195, 201, 198); // Color #C3C9C6
    doc.setLineWidth(0.5); // Grosor
    doc.line(14, 25, 195, 25);

    // Subtítulo
    doc.setFontSize(10);
    doc.setFont('poppins', 'bold');
    doc.text('TOTAL DE HORAS DE GUARDIA', 14, 33);

    // Filtros (formato alineado)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    let filtrosTextY = 39;
    Object.entries(filtros).forEach(([clave, valor]) => {
      doc.text(`${clave}:  ${valor}`, 14, filtrosTextY);
      filtrosTextY += 6;
    });

    // Salto antes de la tabla
    const startTableY = filtrosTextY + 2;

    const tableOptions: UserOptions = {
      head: [headers],
      body: data,
      startY: startTableY,
      theme: 'grid',
      headStyles: {
        fillColor: [22, 96, 78],  // Verde 16604E
        textColor: 255,
        halign: 'center'
      },
      bodyStyles: {
        halign: 'center'
      },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        lineColor: [195, 201, 198], // Gris claro C3C9C6
        lineWidth: 0.2
      },
      didDrawPage: (dataArg) => {
        // Pie de página
        const pageCount = doc.getNumberOfPages();
        const pageCurrent = (doc as any)._autoTable?.pageNumber || 1;

        doc.setFontSize(9);
        doc.text(
          `Página ${pageCurrent} de ${pageCount}`,
          doc.internal.pageSize.getWidth() - 14,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'right' }
        );
      }
    };

    autoTable(doc, tableOptions);

    //doc.save(nombreArchivo);

    doc.output('dataurlnewwindow');
  }

  private getBase64ImageFromURL(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject('No se pudo obtener el contexto del canvas.');
          return;
        }

        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };

      img.onerror = (error) => reject(error);
      img.src = url;
    });
  }
}
