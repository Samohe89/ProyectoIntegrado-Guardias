import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuProfesorComponent } from "./components/menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./components/menu-directivo/menu-directivo.component";
import { RegistroAusenciaProfesorComponent } from './components/registro-ausencia-profesor/registro-ausencia-profesor.component';
import { RegistroAusenciaDirectivoComponent } from './components/registro-ausencia-directivo/registro-ausencia-directivo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuProfesorComponent, MenuDirectivoComponent, RegistroAusenciaProfesorComponent, RegistroAusenciaDirectivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';

  rol: String = "directivo";

  usuarioLogueado: boolean = true;
}
