import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasGuardiaService, ProfesorTotalHorasGuardiaDTO } from '../../services/horasGuardia.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';
import { FiltradoAdaptadoHorasProfesorComponent } from '../filtrado-adaptado-horas-profesor/filtrado-adaptado-horas-profesor.component';
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-horas-guardia',
  standalone: true,
  imports: [CommonModule, FiltradoComponent, FiltradoAdaptadoHorasProfesorComponent],
  providers: [DatePipe],
  templateUrl: './horas-guardia.component.html',
  styleUrl: './horas-guardia.component.css'
})
export class HorasGuardiaComponent implements OnInit {

  profesoresConHoras: ProfesorTotalHorasGuardiaDTO[] = [];

  fechaDesde?: Date | null = null;
  fechaHasta?: Date | null = null;

  rolUsuario: string = '';
  dniProfesor: string = '';

  esProfesor: boolean = false;
  esEquipoDirectivo: boolean = false;

  constructor(private horasGuardiaService: HorasGuardiaService,
    private pdfGenerator: PdfGeneratorService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    const usuarioGuardado = sessionStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.rolUsuario = usuario.rol;
      this.dniProfesor = usuario.dniProfesor;

      this.esProfesor = this.rolUsuario.toLowerCase() === 'profesor';
      this.esEquipoDirectivo = this.rolUsuario.toLowerCase() === 'equipo directivo';
    }

    // Calcular fechas por defecto (inicio curso hasta hoy)
    const hoy = new Date();
    const añoActual = hoy.getFullYear();
    const mesActual = hoy.getMonth(); // Enero = 0, Septiembre = 8

    const añoInicioCurso = mesActual >= 8 ? añoActual : añoActual - 1;
    // Guardar como Date para mostrar en la vista
    this.fechaDesde = new Date(añoInicioCurso, 8, 15); // 15 de septiembre
    this.fechaHasta = hoy;

    // Enviar como strings al servicio
    const fechaDesdeStr = this.formatFecha(this.fechaDesde);
    const fechaHastaStr = this.formatFecha(this.fechaHasta);

    // Cargar datos por defecto al iniciar la vista (sin filtros de fecha)
    const profesorFiltro = this.esProfesor ? this.dniProfesor : null;
    this.cargarDatos(fechaDesdeStr, fechaHastaStr, profesorFiltro);
  }

  cargarDatos(fechaDesde?: string, fechaHasta?: string, profesorFiltro?: string | null): void {
    let profesorFinal: string | null = null;
    let perfil: 'profesor' | 'directivo' = 'directivo'; // Por defecto

    if (this.esProfesor) {
      // Siempre se filtra por dni del profesor logueado
      profesorFinal = this.dniProfesor;
      perfil = 'profesor';
    } else if (profesorFiltro && profesorFiltro.trim() !== '' && profesorFiltro.toLowerCase() !== 'null') {
      profesorFinal = profesorFiltro.trim();
    }

    this.horasGuardiaService.getTotalHorasPorProfesor(fechaDesde, fechaHasta, profesorFinal, perfil)
      .subscribe({
        next: data => {
          this.profesoresConHoras = data;
        },
        error: err => {
          console.error('Error al obtener las horas de guardia:', err);
          this.profesoresConHoras = [];
        }
      });
  }

  onFiltrosAplicados(filtros: { fechaDesde: string, fechaHasta: string, profesorFiltro?: string | null }): void {
    // Actualizar las fechas para que se reflejen en la vista
    this.fechaDesde = filtros.fechaDesde ? new Date(filtros.fechaDesde) : null;
    this.fechaHasta = filtros.fechaHasta ? new Date(filtros.fechaHasta) : null;

    if (this.esProfesor) {
      // Forzar filtro solo para el profesor logueado
      this.cargarDatos(filtros.fechaDesde, filtros.fechaHasta, this.dniProfesor);
    } else {
      // Para directivo se usa el filtro tal cual viene
      this.cargarDatos(filtros.fechaDesde, filtros.fechaHasta, filtros.profesorFiltro ?? null);
    }
  }

  // Función para formatear fecha a 'YYYY-MM-DD'
  private formatFecha(fecha: Date): string {
    // Obtener el año completo
    const year = fecha.getFullYear();
    // Obtener el mes (de 0 a 11)
    // Convertirlo a string y añadir un 0 delante si es necesario
    const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
    // Obtener el día del mes (de 1 a 31)
    const day = fecha.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Método para generar el PDF
  imprimirPDF(): void {
    const headers = ['Profesor', 'Total Horas'];

    const data = this.profesoresConHoras.map(item => [
      item.nombreProfesor,
      Number(item.totalHoras).toFixed(2) // Formatear a 2 decimales
    ]);

    const filtros = {
      'Fecha desde': this.fechaDesde ? this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy') ?? '' : '',
      'Fecha hasta': this.fechaHasta ? this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy') ?? '' : '',
    };

    this.pdfGenerator.generarPdfTabla(
      'TOTAL DE HORAS DE GUARDIA',
      filtros,
      headers,
      data,
      'informe-guardias.pdf'
    );
  }
}
