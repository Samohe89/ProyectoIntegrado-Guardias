import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuProfesorComponent } from "./menu-profesor/menu-profesor.component";
import { MenuDirectivoComponent } from "./menu-directivo/menu-directivo.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuProfesorComponent, MenuDirectivoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';

  rol: String = "directivo";

  usuarioLogueado: boolean = true;
}
