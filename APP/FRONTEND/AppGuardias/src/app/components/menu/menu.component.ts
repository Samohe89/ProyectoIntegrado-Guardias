import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})


export class MenuComponent {

// Importación de variables desde el componente padre (componente principal)
@Input() rol: String = "";

// Emisor de eventos hacia el componente padre (principal) para advertir del cierre de sesión
@Output() logout = new EventEmitter<void>();


// Inyección de enrutador y servicios
constructor(private router: Router, private loginService: LoginService) { }

cerrarSesion() {
  // Eliminación de datos de sesión almacenados por el navegador
  this.loginService.borrarSesionUsuario();

  // Emisión de evento "logout" hacia el componente padre para cerrar sesión
  this.logout.emit();

  
}

}
