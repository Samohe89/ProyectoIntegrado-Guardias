import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./components/menu/menu.component";



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MenuComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'AppGuardias';
  
  estadoLogin: boolean = true;

  rol: string = "Equipo Directivo";


}
