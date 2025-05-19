import { Component, OnInit } from '@angular/core';
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
  // Variables que almacenan el día actual y el siguiente
  diaActual: Date = new Date();     // Por defecto carga el dia actual
  diaSiguiente: Date = new Date(this.diaActual);

  // Variable para indicar la fecha del listado que se muestra en ese momento
  fechaMostrada: Date = new Date(this.diaActual);

  // Array que almacena las ausencias que envía el backend
  ausencias: any[] = [];

  // Array de ausencias agrupadas por hora
  ausenciasAgrupadas: { hora: string, ausencias: any[] }[] = [];


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
    this.fechaMostrada = fecha;
    
    // Formatear fecha que sen envía al backend
    const fechaFormateada = this.formatearFecha(fecha);

    this.ausenciaService.getAusenciasPorFecha(fechaFormateada).subscribe({
      next: data => {
        this.ausencias = data;
        console.log(this.ausencias);

        // Se resetea el array de ausencias agrupadas
        this.ausenciasAgrupadas = [];

        // Variable que almacena la hora por la que se está agrupando
        let horaAgrupacion = null;

        // Variable que contiene el índice del array de ausencias agrupadas
        let indiceAgrupacion = -1;  // Se inicia en -1 porque está vacío, la primera agrupación sería el índice 0 del array

        // Para cada ausencia enviada por el backend
        for (let ausencia of this.ausencias) {
          // Si la hora de la ausencia no coincide con la hora por la que se está agrupando:
          if (ausencia.horariosProfesor.hora !== horaAgrupacion) {
            horaAgrupacion = ausencia.horariosProfesor.hora;
            // Se crea una nueva agrupacion en la que se incluye esta ausencia
            this.ausenciasAgrupadas.push({
              hora: horaAgrupacion,
              ausencias: [ausencia]
            });
            // Se incrementa el contador de esta agrupación    
            indiceAgrupacion++;
            // Si la hora de la ausencia coincide con la hora por la que ya se está agrupando:
          } else {
            // Se añade la ausencia a la misma agrupación anterior (con la misma hora e índice en el array)
            this.ausenciasAgrupadas[indiceAgrupacion].ausencias.push(ausencia);
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
