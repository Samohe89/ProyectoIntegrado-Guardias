import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from "./components/login/login.component";
import { MenuProfesorComponent } from "./components/menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./components/menu-directivo/menu-directivo.component";
import { RegistroAusenciaProfesorComponent } from './components/registro-ausencia-profesor/registro-ausencia-profesor.component';
import { RegistroAusenciaDirectivoComponent } from './components/registro-ausencia-directivo/registro-ausencia-directivo.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LoginComponent, MenuProfesorComponent, MenuDirectivoComponent, RegistroAusenciaProfesorComponent, RegistroAusenciaDirectivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';

  // Variable que controla si el login se ha ejecutado o no
  estadoLogin: boolean = false;

  // Variables que almacenan los datos del usuario logueado
  dniProfesor: string = "";
  cursoAcademico: string = "";
  nombreProfesor: string = "";
  alias: string = "";
  rol: string = "";

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
