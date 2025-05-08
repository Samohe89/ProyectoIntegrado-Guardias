import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuProfesorComponent } from "./menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./menu-directivo/menu-directivo.component";
import { RegistroAusenciaProfesorComponent } from './registro-ausencia-profesor/registro-ausencia-profesor.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuProfesorComponent, MenuDirectivoComponent, RegistroAusenciaProfesorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';

  rol: String = "directivo";

  usuarioLogueado: boolean = true;
}
