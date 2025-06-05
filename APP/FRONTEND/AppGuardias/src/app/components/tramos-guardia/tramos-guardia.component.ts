import { Component, computed, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Profesor, ProfesorService } from '../../services/profesor.service';
import { GuardiaService } from '../../services/guardia.service';

@Component({
  selector: 'app-tramos-guardia',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tramos-guardia.component.html',
  styleUrl: './tramos-guardia.component.css',
  providers: [GuardiaService]
})

export class TramosGuardiaComponent {

  // Variable que almacena los datos del usuario que tiene abierta la sesión
  usuario = JSON.parse(sessionStorage.getItem('usuarioGuardado') || 'null');

  // Variable que almacena la ausencia correspondiente (la recibe del padre)
  idAusencia!: number;

 


  // Variable que almacena el profesor de guardia
  //profesorGuardia: string | null = null;

  // Array de profesores para mostrar en el select
  profesores: Profesor[] = [];

  // Variable para controlar la visualización del modal y el mensaje que muestra
  modalActivo: boolean = false;

  //Array que almacena las guardias de la ausencia
  guardias: any[] = [];




  constructor(
    private profesorService: ProfesorService,
    private guardiaService: GuardiaService
  ) { }


  ngOnInit(): void {
    // Cargar los profesores del select al inicio (Perfil Directivo)
    this.profesorService.getProfesores().subscribe({
      next: profesores => this.profesores = profesores,
      error: err => console.error('Error al cargar profesores:', err)
    });


  }



  // Cargar las guardias asociada a la ausencia
  cargarGuardias(idAusencia: number) {
    this.idAusencia = idAusencia;
    this.guardiaService.getGuardiasPorIdAusencia(idAusencia).subscribe({
      next: data => {
        this.guardias = data;
        console.log("Guardias: ", this.guardias)
      },
      error: err => {
        console.error("Error al cargar las guardias correspondientes a la ausencia: " + idAusencia, err);
      }
    });
  }


  // Comprobar si existe una guardia para un tramo concreto
  existeTramoGuardia(tramo: number): boolean {
    const existe = this.guardias.find(guardia => guardia.tramo === tramo) !== undefined;
    return existe;
  }

  // Cargar el nombre del profesor asignado a un tramo de guardia
  cargarProfesorPorTramo(tramo: number): string {
    const guardia = this.guardias.find(g => g.tramo === tramo);
    if (guardia) {
      return guardia.profesor.nombreProfesor;
    }
    return '';
  }

  eliminarGuardia() {

  }





  cerrarModal() {
    this.modalActivo = false;
  }




}
