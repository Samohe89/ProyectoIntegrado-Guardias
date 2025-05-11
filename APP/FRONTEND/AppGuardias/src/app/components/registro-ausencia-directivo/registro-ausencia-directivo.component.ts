import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfesorService, Profesor, ProfesorId } from '../../services/profesor.service';
import { Ausencia, AusenciaService } from '../../services/ausencia.service';

@Component({
  selector: 'app-registro-ausencia-directivo',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: '../registro-ausencia-directivo/registro-ausencia-directivo.component.html',
  styleUrls: ['../registro-ausencia-directivo/registro-ausencia-directivo.component.css']
})
export class RegistroAusenciaDirectivoComponent implements OnInit {

  profesores: Profesor[] = [];

  ausencia: any = {
    fechaAusencia: '',
    comentario: '',
    profesor: {
      id: {
        dniProfesor: '',
        cursoAcademico: ''
      }

    },
    hora: 0,
  };



  constructor(private profesorService: ProfesorService,
              private ausenciaService: AusenciaService
  ) { }

  onSubmit(form: any): void {
    this.ausenciaService.create(this.ausencia).subscribe(
      response => {
        console.log('Ausencia registrada:', response);
      });
  }

  ngOnInit(): void {
    this.profesorService.getProfesores().subscribe(data => {
      this.profesores = data;
    });
  }

  limpiarFormulario(form: any): void {
    form.resetForm();
    this.ausencia = {
      fechaAusencia: '',
      comentario: '',
      hora: '',
      nombreProfesor:''
    };
  }
}
