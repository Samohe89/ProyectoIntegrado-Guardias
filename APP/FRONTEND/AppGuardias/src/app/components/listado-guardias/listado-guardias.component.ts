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


  constructor(private ausenciaService: AusenciaService) { }

  ngOnInit(): void {
    // Calcular el dia siguiente
     this.diaSiguiente.setDate(this.diaActual.getDate() + 1);  

    // Cargar las ausencias del día actual al inicio
    this.cargarAusencias(this.diaActual);
  }

  
  // Cargar las ausencias registradas en una fecha concreta
  cargarAusencias(fecha: Date): void {
    const fechaFormateada = this.formatearFecha(fecha);
    this.ausenciaService.getAusenciasPorFecha(fechaFormateada).subscribe({
      next: data => {
        this.ausencias = data;
        this.fechaMostrada = fecha;  // Actualiza la fecha mostrada
        console.log(this.ausencias);
      },
      error: err => {
        console.error('Error al cargar las ausencias', err);
      }
    });
  }

esMismaFecha (fecha1: Date, fecha2: Date): boolean {
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
