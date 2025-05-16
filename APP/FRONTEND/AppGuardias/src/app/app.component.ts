import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./components/menu/menu.component";
import { LoginComponent } from "./components/login/login.component";
import { LoginService } from './services/login.service';
import { ListadoGuardiasComponent } from "./listado-guardias/listado-guardias.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuComponent, LoginComponent, ListadoGuardiasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title = 'AppGuardias';

  // Variable que controla si el login se ha ejecutado o no
  //sesionActiva: boolean = false;
  sesionActiva: boolean = true;

  /* Variables que almacenan los datos del usuario logueado
  dniProfesor: string = "";
  cursoAcademico: string = "";
  nombreProfesor: string = "";
  alias: string = "";
  rol: string = "";
  */

  dniProfesor: string = "";
  cursoAcademico: string = "";
  nombreProfesor: string = "";
  alias: string = "";
  rol: string = "Profesor";


  // Inyección de servicios y enrutamiento
  constructor(private loginService: LoginService, private router: Router) { }


  //Método que se ejecuta siempre al incio
  //Permite guardar la sesión del usuario para que no se borre al recargar la página en el navegador    
  ngOnInit(): void {
    const usuarioGuardado = this.loginService.consultarSesionUsuario();
    console.log("Sesión de usuario: ", usuarioGuardado);

    if (usuarioGuardado) {
      this.sesionActiva = true;
      this.dniProfesor = usuarioGuardado.dniProfesor;
      this.cursoAcademico = usuarioGuardado.cursoAcademico;
      this.nombreProfesor = usuarioGuardado.nombreProfesor;
      this.alias = usuarioGuardado.alias;
      this.rol = usuarioGuardado.rol;
    }

  }


  // Método que copiará los datos del usuario logueado recibidos desde el backend
  onLogin(usuarioAutenticado: any) {
    this.sesionActiva = true;
    this.dniProfesor = usuarioAutenticado.dniProfesor;
    this.cursoAcademico = usuarioAutenticado.cursoAcademico;
    this.nombreProfesor = usuarioAutenticado.nombreProfesor;
    this.alias = usuarioAutenticado.alias;
    this.rol = usuarioAutenticado.rol;
  }


  // Método que eliminará los datos del usuario logueado y cerrará sesión
  onLogout() {
    this.sesionActiva = false;
    this.dniProfesor = "";
    this.cursoAcademico = "";
    this.nombreProfesor = "";
    this.alias = "";
    this.rol = "";

    // Redirige a la raiz y reemplaza la URL
    this.router.navigate(['/'], { replaceUrl: true });

  }

}
