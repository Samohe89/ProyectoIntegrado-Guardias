import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorasGuardiaService, ProfesorTotalHorasGuardiaDTO } from '../../services/horasGuardia.service';
import { FiltradoComponent } from '../filtrado/filtrado.component';


@Component({
  selector: 'app-horas-guardia',
  imports: [CommonModule, FiltradoComponent],
  templateUrl: './horas-guardia.component.html',
  styleUrl: './horas-guardia.component.css'
})
export class HorasGuardiaComponent implements OnInit{

  profesoresConHoras: ProfesorTotalHorasGuardiaDTO[] = [];

  constructor(private horasGuardiaService: HorasGuardiaService) {}

  ngOnInit(): void {
    this.horasGuardiaService.getTotalHorasPorProfesor()
      .subscribe({
        next: (data) => this.profesoresConHoras = data,
        error: (err) => console.error('Error al obtener las horas de guardia:', err)
      });
  }


}
