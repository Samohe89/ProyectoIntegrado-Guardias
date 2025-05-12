import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuProfesorComponent } from "./components/menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./components/menu-directivo/menu-directivo.component";
import { LoginComponent } from "./components/login/login.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuProfesorComponent, MenuDirectivoComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';
  
  usuarioLogueado: boolean = false;

  rol: String = "";
  cursoAcademico: String = "";

  onLogin(data: { rol: String, cursoAcademico: String}) {
    this.usuarioLogueado = true;
    this.rol = data.rol;
    this.cursoAcademico = data.cursoAcademico;
  }

  
}
