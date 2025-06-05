import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor, ProfesorService } from '../../services/profesor.service';

@Component({
  selector: 'app-tramos-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramos-guardia.component.html',
  styleUrl: './tramos-guardia.component.css'
})

export class TramosGuardiaComponent {
  
   // Variable que almacena los datos del usuario que tiene abierta la sesión
   usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variable que almacena la ausencia correspondiente
  idAusencia: number | null = null;

  // Variable que almacena el profesor de guardia
  profesorGuardia: string | null = null;

  // Array de profesores para mostrar en el select
    profesores: Profesor[] = [];

 // Variable para controlar la visualización del modal y el mensaje que muestra
 modalActivo: boolean = false;

 
 tramos = {
  primerTramo: false,
  segundoTramo: false,
  tercerTramo: false,
  cuartoTramo: false,
  horaCompleta: false
};




 constructor(
    private profesorService: ProfesorService
  ) { }


  ngOnInit(): void {
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });
  }



eliminarGuardia() {

}





 cerrarModal() {
  this.modalActivo = false;
}




}
