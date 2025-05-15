import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/login';  // Cambia esta URL por la correcta

  constructor(private http: HttpClient) { }


  // Método que manda al BACKEND los datos del usuario que se loguea
  login(usuarioLogin: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuarioLogin);
  }


  /* 
  Método que guarda la sesión de usuario (sus datos) en el navegador
  De esta forma, al recargar la página en el navegador, no se sale de la sesión ni se reinicia la app
  */
  guardarSesionUsuario(usuario: any) {
    localStorage.setItem('usuarioGuardado', JSON.stringify(usuario))
  }


  // Método que devuleve los datos de la sesión guardada
  consultarSesionUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarioGuardado');
    if (usuarioGuardado) {
      return JSON.parse(usuarioGuardado);
    } else {
      return null;
    }
  }

  // Método que borra la sesión guardada
  borrarSesionUsuario() {
    localStorage.removeItem('usuarioGuardado');
  }

}




