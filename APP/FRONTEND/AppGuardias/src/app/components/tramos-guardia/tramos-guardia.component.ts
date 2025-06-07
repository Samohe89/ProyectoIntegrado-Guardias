import { Component, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tramos-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramos-guardia.component.html',
  styleUrl: './tramos-guardia.component.css'
})

export class TramosGuardiaComponent {
  // Variable que almacena la ausencia correspondiente
  idAusencia: number | null = null;

 // Variable para controlar la visualización del modal y el mensaje que muestra
 modalActivo: boolean = false;

 
 tramos = {
  primerTramo: false,
  segundoTramo: false,
  tercerTramo: false,
  cuartoTramo: false,
  horaCompleta: false
};




 cerrarModal() {
  this.modalActivo = false;
}




}
