import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AusenciaService {
  private apiUrl = 'http://localhost:8080/api/ausencias';

  constructor(private http: HttpClient) {}

  crearRegistroAusencia(ausencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registroAusencia`, ausencia);
  }

  getAusenciasPorFecha(fecha: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fecha?fecha=${fecha}`);
  }

}
