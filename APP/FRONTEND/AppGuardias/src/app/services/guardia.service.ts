import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardiaService {

  private apiUrl = 'http://localhost:8080/api/guardias';

  constructor(private http: HttpClient) { }

  getGuardiasPorIdAusencia(idAusencia: number): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/ausencia/${idAusencia}`)
  }

  
  getTramosPorIdAusencia(idAusencia: number): Observable<any> {
    return this.http.get<number[]>(`${this.apiUrl}/tramos/${idAusencia}`)
  }

  registrarGuardias(guardias: any[]): Observable<any> {
    return this.http.post<any[]>(`${this.apiUrl}/registrar`, guardias)
  }

  eliminarGuardia(idGuardia: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminar/${idGuardia}`, { responseType: 'text' as 'json' });
  }



}
