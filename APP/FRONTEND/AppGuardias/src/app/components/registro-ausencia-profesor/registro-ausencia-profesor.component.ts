import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-ausencia-profesor',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-ausencia-profesor.component.html',
  styleUrl: './registro-ausencia-profesor.component.css'
})
export class RegistroAusenciaProfesorComponent {

  ausencia = {
    FechaAusencia: '',
    Hora: '', //TENGO DUDAS EN ESTE CAMPO
    Comentario: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido. Enviar datos:', this.ausencia); //EN LUGAR DE UN CONSOLE LOG, EL MODAL DE REGISTRO
      // LóGICA PARA ENVIAR LA PETICIÓN AL BACKEND
    } else {
      console.warn('Formulario inválido'); //NO ESTÁ PENSADO UN MODAL DE REGISTRO NO VÁLIDO
    }
  }

  limpiarFormulario(form: NgForm) {
    form.resetForm();
  }
}
