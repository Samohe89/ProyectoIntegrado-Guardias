import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-listado-guardias',
  imports: [DatePipe],
  templateUrl: './listado-guardias.component.html',
  styleUrl: './listado-guardias.component.css'
})


export class ListadoGuardiasComponent {
  // Variable que almacena el día actual y el siguiente
 diaActual = new Date(); 
 diaSiguiente = this.diaActual.getDate() + 1;

 


}
