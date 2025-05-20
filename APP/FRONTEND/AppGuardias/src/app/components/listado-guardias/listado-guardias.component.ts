import { Component, OnInit, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AusenciaService } from '../../services/ausencia.service'

@Component({
  selector: 'app-listado-guardias',
  imports: [CommonModule, DatePipe],
  templateUrl: './listado-guardias.component.html',
  styleUrl: './listado-guardias.component.css',
  providers: [AusenciaService]
})


export class ListadoGuardiasComponent implements OnInit {
  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variables que almacenan el día actual y el siguiente
  diaActual: Date = new Date();     // Por defecto carga el dia actual
  diaSiguiente: Date = new Date(this.diaActual);

  // Variable para indicar la fecha del listado que se muestra en ese momento
  fechaUnica: Date = new Date(this.diaActual);
  fechaDesde: Date | null = null;
  fechaHasta: Date | null = null;

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


  constructor(private ausenciaService: AusenciaService) { }

  ngOnInit(): void {
    // Calcular el dia siguiente
    this.diaSiguiente.setDate(this.diaActual.getDate() + 1);

    // Cargar las ausencias del día actual al inicio
    this.cargarAusencias(this.diaActual);
  }


  // Cargar las ausencias registradas en una fecha concreta
  cargarAusencias(fecha: Date): void {
    // Actualizar la fecha mostrada
    this.fechaUnica = fecha;

    // Formatear fecha que sen envía al backend
    const fechaFormateada = this.formatearFecha(fecha);
    this.ausenciaService.getAusenciasPorFecha(fechaFormateada).subscribe({
      next: data => {
        this.ausencias = data;
        console.log(this.ausencias);

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
        console.log(this.ausenciasAgrupadas);
      },
      error: err => {
        console.error('Error al cargar las ausencias', err);
      }
    });
  }




  esMismaFecha(fecha1: Date, fecha2: Date): boolean {
    if (fecha1.toDateString() === fecha2.toDateString()) {
      return true;
    } else {
      return false;
    };
  }

  formatearFecha(fecha: Date): string {
    return fecha.toISOString().split('T')[0]; // Se queda solo con la fecha 'YYYY-MM-DD'
  }


}
