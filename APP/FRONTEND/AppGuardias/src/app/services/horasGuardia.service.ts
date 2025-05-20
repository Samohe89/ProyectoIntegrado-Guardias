import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProfesorTotalHorasGuardiaDTO {
  id: {
    dniProfesor: string;
    cursoAcademico: string;
  };
  nombreProfesor: string;
  totalHoras: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorasGuardiaService {
  private apiUrl = 'http://localhost:8080/api/guardias/totalHoras';

  constructor(private http: HttpClient) {}

  getTotalHorasPorProfesor(): Observable<ProfesorTotalHorasGuardiaDTO[]> {
    return this.http.get<ProfesorTotalHorasGuardiaDTO[]>(this.apiUrl);
  }
}
