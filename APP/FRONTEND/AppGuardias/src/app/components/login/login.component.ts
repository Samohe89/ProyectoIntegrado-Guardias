import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  submit: Boolean = false;
  inputType: String = "password";

  datosUsuario = {
    username: '',
    password: '',
    rol: '',
    cursoAcademico: '2024'
  };


  @Output() loginOk = new EventEmitter<{ rol: string, cursoAcademico: string }>();

  


  mostrarPassword() {
    this.inputType = 'text';
  }

  ocultarPassword() {
    this.inputType = 'password';
  }

  onSubmit(formulario: NgForm) {
    this.submit = true;
    

  }

}
