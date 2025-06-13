import { Injectable } from "@angular/core";
import jsPDF from 'jspdf';
import autoTable, { UserOptions } from 'jspdf-autotable';

@Injectable({
  providedIn: "root"
})
export class PdfGeneratorService {

  async generarPdfTabla(
    subtitulo: string,
    filtros: { [key: string]: string },
    headers: string[],
    data: (string | number)[][],
    nombreArchivo: string,
    opcionesExtra?: {
      profesorFiltrado?: string,
      margin?: { left: number, right: number }
    }
  ) {
    const doc = new jsPDF();

    try {
      const base64Logo = await this.getBase64ImageFromURL('/images/logo.png');
      doc.addImage(base64Logo, 'PNG', 14, 5, 25, 25); // Logo en la esquina superior izquierda
    } catch (error) {
      console.warn('No se pudo cargar el logo:', error);
    }

    // Título general centrado arriba
    doc.setFontSize(16);
    doc.setFont('Helvetica', 'normal');
    doc.text('AUSENCIAS Y GUARDIAS', 105, 25, { align: 'center' });

    // Línea horizontal
    doc.setDrawColor(195, 201, 198); // Color #C3C9C6
    doc.setLineWidth(0.5); // Grosor
    doc.line(14, 35, 195, 35);

    // Subtítulo
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    doc.text(subtitulo, 14, 43);

    // Filtros (formato alineado)
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
    let filtrosTextY = 50;

    doc.text(`Fecha desde: ${filtros['Fecha desde'] || ''}`, 14, 50);
    doc.text(`Fecha hasta: ${filtros['Fecha hasta'] || ''}`, 80, 50);

    // Si se ha pasado profesorFiltrado, se muestra debajo
    if (opcionesExtra?.profesorFiltrado) {
      filtrosTextY += 7;  // Ajusta salto de línea
      doc.text(`Profesor filtrado: ${opcionesExtra.profesorFiltrado}`, 14, filtrosTextY);
    }

    // Salto antes de la tabla
    const startTableY = filtrosTextY + 15;

    // Tabla
    const defaultMargin = { left: 40, right: 40 };
    const margin = opcionesExtra?.margin || defaultMargin;

    const tableOptions: UserOptions = {
      head: [headers],
      body: data,
      startY: startTableY,
      margin: margin,
      theme: 'grid',
      styles: {
        font: 'Helvetica',
        fontSize: 10,
        halign: 'center',
        valign: 'middle',
        cellPadding: 3,
        lineColor: [195, 201, 198], // Gris claro C3C9C6
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [22, 96, 78],  // Verde 16604E
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center',
      },
      bodyStyles: {
        halign: 'center'
      },
      didParseCell: (data) => {
        if (data.section === 'body') {
          // Pintar filas impares con verde claro, filas pares en blanco
          if (data.row.index % 2 === 1) {
            data.cell.styles.fillColor = [237, 241, 239]; // Efecto 'striped' EDF1EF
          } else {
            data.cell.styles.fillColor = [255, 255, 255]; // Sin color, blanco
          }
        }
      },
      didDrawPage: (dataArg) => {
        // Pie de página
        const pageCount = doc.getNumberOfPages();
        const pageCurrent = doc.getCurrentPageInfo().pageNumber;

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

    // Guardar el PDF en un archivo
    doc.save(nombreArchivo || 'informe-guardias.pdf');

    // Abrir el pdf en una nueva ventana
    doc.output('dataurlnewwindow');
  }

  private async getBase64ImageFromURL(url: string): Promise<string> {
    const res = await fetch(url, { mode: 'cors' });
    const blob = await res.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        if (dataUrl) {
          resolve(dataUrl);
        } else {
          reject('No se pudo convertir la imagen a base64');
        }
      };
      reader.onerror = () => reject('Error leyendo el blob de la imagen');
      reader.readAsDataURL(blob);
    });
  }
}
