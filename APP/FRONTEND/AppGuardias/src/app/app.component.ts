import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { MenuProfesorComponent } from "./components/menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./components/menu-directivo/menu-directivo.component";
import { LoginService } from './services/login.service';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoginComponent, MenuProfesorComponent, MenuDirectivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'AppGuardias';
  
  // Variable que controla si el login se ha ejecutado o no
  estadoLogin: boolean = false;

  // Variables que almacenan los datos del usuario logueado
  dniProfesor: string = "";
  cursoAcademico: string = "";
  nombreProfesor: string = "";
  alias: string = "";
  rol: string = "";
  
  // Inyección de servicios
  constructor(private loginService: LoginService) { }


  //Método que se ejecuta siempre al incio
  //Permite guardar la sesión del usuario para que no se borre al recargar la página en el navegador    
  ngOnInit(): void {
    const usuarioGuardado = this.loginService.consultarSesionUsuario();
    if (usuarioGuardado) {
      this.estadoLogin = true;
      this.dniProfesor = usuarioGuardado.dniProfesor;
      this.cursoAcademico = usuarioGuardado.cursoAcademico;
      this.nombreProfesor = usuarioGuardado.nombreProfesor;
      this.alias = usuarioGuardado.alias;
      this.rol = usuarioGuardado.rol;
    }
  }



  // Método que copiará los datos del usuario logueado recibidos desde el backend
  onLogin(usuarioAutenticado: any) {
    this.estadoLogin = true;
    this.dniProfesor = usuarioAutenticado.dniProfesor;
    this.cursoAcademico = usuarioAutenticado.cursoAcademico;
    this.nombreProfesor = usuarioAutenticado.nombreProfesor;
    this.alias = usuarioAutenticado.alias;
    this.rol = usuarioAutenticado.rol;
  }

  
}
