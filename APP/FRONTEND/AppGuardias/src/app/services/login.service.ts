import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/login';  // Cambia esta URL por la correcta

  constructor(private http: HttpClient) { }

  login(usuarioLogin: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, usuarioLogin);
  }
}




