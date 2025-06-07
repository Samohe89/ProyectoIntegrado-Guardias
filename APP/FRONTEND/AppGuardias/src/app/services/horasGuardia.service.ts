import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  // getTotalHorasPorProfesor(): Observable<ProfesorTotalHorasGuardiaDTO[]> {
  //   return this.http.get<ProfesorTotalHorasGuardiaDTO[]>(this.apiUrl);
  // }

  getTotalHorasPorProfesor(fechaDesde?: string, fechaHasta?: string, profesorFiltro?: string | null): Observable<ProfesorTotalHorasGuardiaDTO[]> {
    let params = new HttpParams();

    if (fechaDesde) {
      params = params.set('fechaDesde', fechaDesde);
    }
    if (fechaHasta) {
      params = params.set('fechaHasta', fechaHasta);
    }
    // Aquí evitamos enviar el string "null"
  if (profesorFiltro && profesorFiltro !== 'null') {
    params = params.set('profesorFiltro', profesorFiltro);
  }
    return this.http.get<ProfesorTotalHorasGuardiaDTO[]>(this.apiUrl, { params });
  }
}
