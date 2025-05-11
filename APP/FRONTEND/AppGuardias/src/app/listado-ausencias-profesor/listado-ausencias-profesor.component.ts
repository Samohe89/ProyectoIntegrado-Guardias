import { Component, OnInit } from '@angular/core';
import { Ausencia, AusenciaService } from '../services/ausencia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-ausencias-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-ausencias-profesor.component.html',
  styleUrl: './listado-ausencias-profesor.component.css'
})
export class ListadoAusenciasProfesorComponent implements OnInit {
  ausencias: Ausencia[] = [];

  constructor(private ausenciaService: AusenciaService) {}

  ngOnInit() {
    this.ausenciaService.getAll().subscribe(data => {
      this.ausencias = data;
    });
  }
}