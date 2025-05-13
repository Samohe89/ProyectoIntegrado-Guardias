import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm} from '@angular/forms';
import { LoginService } from '../../services/login.service';



@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [LoginService]
})

export class LoginComponent {
  // Variable que controla si se ha enviado el formulario
  submit: boolean = false;

  // Variable que controla el tipo de input para la contraseña (mostrar/ocultar)
  inputType: string = "password";

  // Objeto para almacenar los datos de usuario introducidos en el formulario
  usuarioLogin = {
    username: '',
    password: '',
    rol: '',
    cursoAcademico: '2024'
  };

  // Objeto para almacenar los datos del usuario autenticado (los que devuelve el backend)
  usuarioAutenticado = {
    dniProfesor: '',
    cursoAcademico: '',
    nombreProfesor: '',
    alias: '',
    rol: ''
  };

  // Emisor de eventos para enviar los datos del usuario autenticado al componente principal
  @Output() loginOk = new EventEmitter<any>();

  constructor(private loginService: LoginService) { }


  mostrarPassword() {
    this.inputType = 'text';
  }

  ocultarPassword() {
    this.inputType = 'password';
  }


  
  onSubmit(formulario: NgForm) {
    this.submit = true;

    if (formulario.valid) {
      // Enviar los datos del usuario introducidos en el formulario
      this.loginService.login(this.usuarioLogin).subscribe({
        next: (response) => {
          // Guardar los datos del usuario autenticado recibidos como respuesta desde el Backend
          this.usuarioAutenticado = response;

          // Emitir el evento con los datos del usuario autenticado
          this.loginOk.emit(this.usuarioAutenticado);
          console.log('Usuario autenticado', response);
        },
        error: (error) => {
          console.error('Error de autenticación', error);
        },
        complete: () => {
          console.log('Login realizado con éxito');
        }
      });
    }
  }



}
