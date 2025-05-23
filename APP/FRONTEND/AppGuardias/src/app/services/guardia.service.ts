import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardiaService {

  private apiUrl = 'http://localhost:8080/api/guardias';

  constructor(private http: HttpClient) { }

  
  getTramosPorIdAusencia(idAusencia: number) {
    return this.http.get<number[]>(`${this.apiUrl}/tramos/${idAusencia}`)

  }


}
