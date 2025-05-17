import { Component, OnInit } from '@angular/core';
import { Ausencia, AusenciaService } from '../services/ausencia.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listado-ausencias-profesor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listado-ausencias-profesor.component.html',
  styleUrl: './listado-ausencias-profesor.component.css',
})
export class ListadoAusenciasProfesorComponent implements OnInit {
  ausencias: Ausencia[] = [];

  mostrarModal: boolean = false;
  ausenciaSeleccionada: Ausencia | null = null;

  constructor(private ausenciaService: AusenciaService) {}

  ngOnInit() {
    this.ausenciaService.getAll().subscribe((data) => {
      this.ausencias = data;
    });
  }

  //Lógica para eliminar una ausencia

  abrirModal(ausencia: Ausencia) {
    this.ausenciaSeleccionada = ausencia;
    this.mostrarModal = true;
  }

  cancelarEliminacion() {
    this.ausenciaSeleccionada = null;
    this.mostrarModal = false;
  }

  confirmarEliminacion() {
    if (this.ausenciaSeleccionada?.id) {
      this.ausenciaService
        .delete(this.ausenciaSeleccionada.id)
        .subscribe(() => {
          // Quitar del array local
          this.ausencias = this.ausencias.filter(
            (a) => a.id !== this.ausenciaSeleccionada?.id
          );
          this.cancelarEliminacion(); // Cierra modal
        });
    }
  }

}
