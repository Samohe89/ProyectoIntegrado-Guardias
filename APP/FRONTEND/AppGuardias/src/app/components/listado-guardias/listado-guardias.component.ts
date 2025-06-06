import { Component, OnInit, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AusenciaService } from '../../services/ausencia.service'
import { GuardiaService } from '../../services/guardia.service';
import { FiltradoComponent } from "../filtrado/filtrado.component";
import { TramosGuardiaComponent } from '../tramos-guardia/tramos-guardia.component';


@Component({
  selector: 'app-listado-guardias',
  imports: [CommonModule, DatePipe, FiltradoComponent, TramosGuardiaComponent],
  templateUrl: './listado-guardias.component.html',
  styleUrl: './listado-guardias.component.css',
  providers: [AusenciaService, GuardiaService]
})


export class ListadoGuardiasComponent implements OnInit {
  @ViewChild('modalTramos') modalTramos!: TramosGuardiaComponent;


  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variables que almacenan el día actual y el siguiente
  diaActual: Date = new Date();     // Por defecto carga el dia actual
  diaSiguiente: Date = new Date(this.diaActual);

  // Variable para indicar la fecha del listado que se muestra en ese momento
  fechaUnica: Date = new Date(this.diaActual);
  fechaDesde: string | null = null;
  fechaHasta: string | null = null;

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


  constructor(private ausenciaService: AusenciaService, private guardiaService: GuardiaService) { }

  ngOnInit(): void {
    // Calcular el dia siguiente
    this.diaSiguiente.setDate(this.diaActual.getDate() + 1);

    // Cargar las ausencias del día actual al inicio
    this.cargarAusencias(this.diaActual);

    // Prueba para cargar ausencias entre fechas al inicio
    // this.fechaDesde = new Date(this.diaActual.getFullYear(), 4, 1);
    // this.cargarAusenciasEntreFechas(this.fechaDesde, this.diaActual);
  }


  // Cargar las ausencias registradas en una fecha concreta
  cargarAusencias(fecha: Date): void {
    // Actualizar la fecha mostrada
    this.fechaUnica = fecha;

    // Resetear el array de tramos
    this.tramosPorAusencia = [];

    // Formatear fecha que sen envía al backend
    const fechaFormateada = this.formatearFecha(fecha);
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
        } else {
          //this.mostrarError('Error desconocido.');
        }
      }
    });
  }

  // Cargar las ausencias registradas en un intervalo de fechas
  cargarAusenciasEntreFechas(fechaDesde: string, fechaHasta: string): void {
    // Actualizar la fecha mostrada
    this.fechaDesde = fechaDesde;
    this.fechaHasta = fechaHasta;
 

    this.ausenciaService.getAusenciasEntreFechas(fechaDesde, fechaHasta).subscribe({
      next: data => {
        this.ausencias = data;
        console.log("Ausencias devueltas por backend: ", this.ausencias);
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
        } else {
          //this.mostrarError('Error desconocido.');
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


  // Método para aplicvar filtros a la tabla
  filtrarTabla(filtros: { fechaDesde: string, fechaHasta: string, profesorFiltro: string | null }) {
    console.log('Filtros recibidos del hijo:', filtros);
    this.fechaDesde = filtros.fechaDesde;
    this.fechaHasta = filtros.fechaHasta;

    this.cargarAusenciasEntreFechas(this.fechaDesde, this.fechaHasta);
    /*
    this.fechaDesde = filtros.fechaDesde;
    this.fechaHasta = filtros.fechaHasta;
    const idProfesor = filtros.idProfesor;
    */

  }


  // Método para abrir el modal de tramos de guardia
  abrirModalTramos(idAusencia: number, grupo: string) {
    this.modalTramos.cargarGuardias (idAusencia);
    this.modalTramos.grupo = grupo;
    this.modalTramos.modalActivo = true;
  }
}
