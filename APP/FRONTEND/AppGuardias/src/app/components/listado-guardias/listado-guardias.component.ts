import { Component, OnInit, ViewChild, } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AusenciaService } from '../../services/ausencia.service'
import { GuardiaService } from '../../services/guardia.service';
import { FiltradoComponent } from "../filtrado/filtrado.component";
import { TramosGuardiaComponent } from '../tramos-guardia/tramos-guardia.component';
import { DetallesGuardiaComponent } from "../detalles-guardia/detalles-guardia.component";
import { PdfGeneratorService } from '../../services/pdf-generator.service';
import { firstValueFrom } from 'rxjs';


@Component({
  selector: 'app-listado-guardias',
  imports: [CommonModule, DatePipe, FiltradoComponent, TramosGuardiaComponent, DetallesGuardiaComponent],
  templateUrl: './listado-guardias.component.html',
  styleUrl: './listado-guardias.component.css',
  providers: [AusenciaService, GuardiaService, DatePipe]
})


export class ListadoGuardiasComponent implements OnInit {

  // Permite acceder al componente hijo a través de una variable
  @ViewChild('modalTramos') modalTramos!: TramosGuardiaComponent;
  @ViewChild('modalDetalles') modalDetalles!: DetallesGuardiaComponent;


  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variables que almacenan el día actual y el siguiente
  diaActual: Date = new Date();     // Por defecto carga el dia actual
  diaSiguiente: Date = new Date(this.diaActual);

  // Variable para indicar la fecha del listado que se muestra en ese momento
  fechaUnica: Date = new Date(this.diaActual);
  fechaDesde: string | null = null;
  fechaHasta: string | null = null;

  // Variable que almacena el profesor asignado en el filtro
  profesorFiltro: string | null = null;

  // Array que almacena las ausencias que envía el backend
  ausencias: any[] = [];

  // Array de ausencias agrupadas por fecha y hora
  ausenciasAgrupadas: {
    fecha: string,
    horas: {
      hora: string,
      ausencias: any[]
    }[],
    cantidadAusencias: number;
  }[] = [];


  // Array para almacenar los tramos registrados de cada ausencia
  tramosPorAusencia: {
    idAusencia: number,
    tramos: number[]
  }[] = [];


  // Mensaje en caso de que no existan ausencias
  mensajeTablaVacia: String = "";



  constructor(
    private ausenciaService: AusenciaService,
    private guardiaService: GuardiaService,
    private pdfGenerator: PdfGeneratorService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    // Calcular el dia siguiente
    const diaSemana = this.diaActual.getDay();
    if (diaSemana === 5) {  // si hoy es viernes, carga el lunes
      this.diaSiguiente.setDate(this.diaActual.getDate() + 3);
    } else if (diaSemana === 6) { // si hoy es sábado, carga el lunes
      this.diaSiguiente.setDate(this.diaActual.getDate() + 2);
    } else {  // en cualquie otro caso, carga el dia siguiente
      this.diaSiguiente.setDate(this.diaActual.getDate() + 1);
    }

    // Cargar las ausencias del día actual al inicio
    this.cargarAusencias(this.diaActual);
  }


  // Cargar las ausencias registradas en una fecha concreta
  cargarAusencias(fecha: Date): void {
    // Actualizar la fecha mostrada
    this.fechaUnica = fecha;

    // Resetear el array de tramos
    this.tramosPorAusencia = [];

    // Formatear fecha que se envía al backend
    const fechaFormateada = this.formatearFecha(fecha);
    //console.log("fecha formateada: ",fechaFormateada);
    this.ausenciaService.getAusenciasPorFecha(fechaFormateada).subscribe({
      next: data => {
        this.ausencias = data;
        // console.log("Ausencias devueltas por backend: ", this.ausencias);
        this.agruparAusencias(this.ausencias);
        console.log("Ausencias agrupadas: ", this.ausenciasAgrupadas);

        for (let ausencia of this.ausencias) {
          this.cargarTramos(ausencia.id);
        }
        console.log("tramosPorAusencia: ", this.tramosPorAusencia);
      },
      error: err => {
        if (err.status === 404) {
          this.ausencias = [];
          this.ausenciasAgrupadas = [];
          this.mensajeTablaVacia = "No existen ausencias registradas.";
        }
      }
    });
  }

  // Cargar las ausencias por los filtros seleccionados
  cargarAusenciasFiltradas(fechaDesde?: string, fechaHasta?: string, profesorFiltro?: string | null): void {
    // Resetear el array de tramos
    this.tramosPorAusencia = [];

    // Guardar criterios aplicados
    if (fechaDesde !== null && fechaDesde !== undefined) {
      this.fechaDesde = fechaDesde;
    } else {
      this.fechaDesde = '';
    }
    if (fechaHasta !== null && fechaHasta !== undefined) {
      this.fechaHasta = fechaHasta;
    } else {
      this.fechaHasta = '';
    }
    if (profesorFiltro !== null && profesorFiltro !== undefined) {
      this.profesorFiltro = profesorFiltro;
    } else {
      this.profesorFiltro = '';
    }

    // Filtro por fechas y por profesor
    this.ausenciaService.getAusenciasEntreFechasPorProfesorGuardia(this.fechaDesde, this.fechaHasta, this.profesorFiltro).subscribe({
      next: data => {
        this.ausencias = data;
        console.log("Ausencias devueltas por backend: ", this.ausencias);

        //Si no se ha filtrado por fechas, se debe extraer fechaDesde y fechaHasta de la respuesta del backend (que ordena las ausencias por fecha ascendente)
        if (!fechaDesde && !fechaHasta && this.ausencias.length > 0) {
          this.fechaDesde = this.ausencias[0].fechaAusencia;
          this.fechaHasta = this.ausencias[this.ausencias.length - 1].fechaAusencia;
        }

        this.agruparAusencias(this.ausencias);
        console.log("Ausencias agrupadas: ", this.ausenciasAgrupadas);

        for (let ausencia of this.ausencias) {
          this.cargarTramos(ausencia.id);
        }
        console.log("tramosPorAusencia: ", [...this.tramosPorAusencia]);
      },

      error: err => {
        if (err.status === 404) {
          this.ausencias = [];
          this.ausenciasAgrupadas = [];
          this.mensajeTablaVacia = "No existen ausencias registradas.";
        }
      }
    });
  }


  // Método para verificar la equivalencia de fechas
  esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    if (fecha1.toDateString() === fecha2.toDateString()) {
      return true;
    } else {
      return false;
    };
  }

  // Método para dar formato a la fecha que se envía desde el frontend
  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0]; // Se queda solo con la fecha 'YYYY-MM-DD'
  }

  // Método que agrupa las ausencias por fecha y hora
  agruparAusencias(ausencias: any[]): void {
    //Resetear el array de ausencias agrupadas 
    this.ausenciasAgrupadas = [];

    // Declaracion de variables que almacenan los distintos criterios de agrupacion
    let fechaAgrupacion = "";
    let horaAgrupacion = "";
    let agrupacionPorFecha: {
      fecha: string,
      horas: { hora: string, ausencias: any[] }[],
      cantidadAusencias: number
    } | null = null;
    let agrupacionPorHora: {
      hora: string,
      ausencias: any[]
    } | null = null;

    // Para cada ausencia recibida del backend
    for (let ausencia of this.ausencias) {
      const fechaAusencia = ausencia.fechaAusencia;
      const horaAusencia = ausencia.horariosProfesor.hora;

      // Si la fecha de la ausencia cambia respecto a la fecha por la que se estaba agrupando
      if (fechaAusencia !== fechaAgrupacion) {
        // Se crea asigna la nueva fecha de agrupación
        fechaAgrupacion = fechaAusencia;
        // Se crea una nueva agrupacion para esa fecha
        agrupacionPorFecha = {
          fecha: fechaAusencia,
          horas: [],
          cantidadAusencias: 0
        }
        // Se añade dicha agrupación al array general de ausencias agrupadas por fecha y hora
        this.ausenciasAgrupadas.push(agrupacionPorFecha);
        // Se resetea la hora por la que se estaba agrupando 
        horaAgrupacion = "";
      }

      // Si la hora de la ausencia cambia respecto a la hora por la que se estaba agrupando 
      if (horaAusencia !== horaAgrupacion) {
        // Se crea asigna la nueva hora de agrupación
        horaAgrupacion = horaAusencia;
        // Se crea una nueva agrupacion para esa hora
        agrupacionPorHora = {
          hora: horaAusencia,
          ausencias: []
        };
        // Se añade dicha agrupación por hora a la agrupación por fecha que se está ejecutando
        agrupacionPorFecha?.horas.push(agrupacionPorHora);
      }

      // Se añade la ausencia en cuestión a la agrupación por hora que se está ejecutando
      agrupacionPorHora?.ausencias.push(ausencia);

      // Se incrementa el contador de las ausencias de esa agrupación por fecha
      if (agrupacionPorFecha) {
        agrupacionPorFecha.cantidadAusencias++;
      }
    }
  }

  // Cargar los tramos de guardia asociados a cada ausencia
  cargarTramos(idAusencia: number) {
    this.guardiaService.getTramosPorIdAusencia(idAusencia).subscribe({
      next: data => {
        this.tramosPorAusencia.push({ idAusencia, tramos: data })
      },
      error: err => {
        console.error("Error al cargar los tramos de las guardias correspondientes a la ausencia: " + idAusencia, err);
      }
    });
  }

  // Cargar tramos por idAusencia
  cargarTramosPorIdAusencia(idAusencia: number): number[] {
    const registro = this.tramosPorAusencia.find(ausencia => ausencia.idAusencia === idAusencia);

    if (registro) {
      return registro.tramos;
    } else {
      return [];
    }
  }


  // Aplicar filtros a la tabla
  filtrarTabla(filtros: { fechaDesde: string, fechaHasta: string, profesorFiltro: string | null }) {
    console.log('Filtros recibidos del hijo:', filtros);
    this.fechaDesde = filtros.fechaDesde;
    this.fechaHasta = filtros.fechaHasta;
    this.profesorFiltro = filtros.profesorFiltro;

    //this.cargarAusenciasEntreFechas(this.fechaDesde, this.fechaHasta);
    this.cargarAusenciasFiltradas(this.fechaDesde, this.fechaHasta, this.profesorFiltro)
  }


  // Abrir el modal de tramos de guardia
  abrirModalTramos(idAusencia: number, grupo: string) {
    this.modalTramos.cargarGuardias(idAusencia);
    this.modalTramos.grupo = grupo;
    this.modalTramos.cargarProfesoresSelect();
    this.modalTramos.modalActivo = true;
  }


  // Abrir el modal de detalles de guardia
  abrirModalDetalles(idAusencia: number) {
    this.modalDetalles.cargarAusencia(idAusencia);
    this.modalDetalles.modalActivo = true;
  }


  // Recargar la vista si se han actualizado las guardias (creado o borrado)
  recargarDatos(): void {
    if (this.fechaDesde && this.fechaHasta) {
      this.cargarAusenciasFiltradas(this.fechaDesde, this.fechaHasta, this.profesorFiltro);
    } else {
      this.cargarAusencias(this.fechaUnica);
    }
  }


  // Generar el informe PDF
  async imprimirPDF(): Promise<void> {
    const subtitulo = 'LISTADO DE GUARDIAS';

    const filtros: any = {};
    if (this.fechaDesde === null || this.fechaHasta === null) {
      filtros['Fecha desde'] = this.fechaUnica ? this.datePipe.transform(this.fechaUnica, 'dd/MM/yyyy') ?? '' : '';
      filtros['Fecha hasta'] = this.fechaUnica ? this.datePipe.transform(this.fechaUnica, 'dd/MM/yyyy') ?? '' : '';
    } else {
      filtros['Fecha desde'] = this.fechaDesde ? this.datePipe.transform(this.fechaDesde, 'dd/MM/yyyy') ?? '' : '';
      filtros['Fecha hasta'] = this.fechaHasta ? this.datePipe.transform(this.fechaHasta, 'dd/MM/yyyy') ?? '' : '';
    }

    const headers = ['Fecha', 'Hora', 'Grupo', 'Profesor Ausente', 'Tramo', 'Profesor de Guardia'];

    const data: (string | number)[][] = [];

    for (const agrupacion of this.ausenciasAgrupadas) {
      for (const hora of agrupacion.horas) {
        for (const ausencia of hora.ausencias) {
          try {
            const guardias = await firstValueFrom(this.guardiaService.getGuardiasPorIdAusencia(ausencia.id));

            const guardiasFiltradas = this.profesorFiltro ? guardias.filter((g:any) => g.profesor.nombreProfesor === this.profesorFiltro) : guardias;

            if (guardiasFiltradas.length > 0) {
              for (const guardia of guardiasFiltradas) {
                data.push([
                  this.datePipe.transform(ausencia.fechaAusencia, 'dd/MM/yyyy') ?? '',
                  ausencia.horariosProfesor.hora + "ª Hora",
                  ausencia.horariosProfesor.grupo,
                  ausencia.horariosProfesor.profesor.nombreProfesor,
                  guardia.tramo,
                  guardia.profesor.nombreProfesor
                ]);
              }
            } else if (!this.profesorFiltro) {
              data.push([
                this.datePipe.transform(ausencia.fechaAusencia, 'dd/MM/yyyy') ?? '',
                ausencia.horariosProfesor.hora + "ª Hora",
                ausencia.horariosProfesor.grupo,
                ausencia.horariosProfesor.profesor.nombreProfesor,
                '-',
                '-'
              ]);
            }
          } catch (err) {
            console.error('Error al obtener guardias para la ausencia ID', ausencia.id, err);
          }
        }
      }
    }

    this.pdfGenerator.generarPdfTabla(
      subtitulo,
      filtros,
      headers,
      data,
      'informe-guardias.pdf',
      { profesorFiltrado: this.profesorFiltro || '',
        margin: { left: 15, right: 15 }
       }   
         
    );
  }



}
