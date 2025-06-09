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

  getTotalHorasPorProfesor(
  fechaDesde?: string,
  fechaHasta?: string,
  profesorFiltro?: string | null,
  perfil?: 'profesor' | 'directivo'
): Observable<ProfesorTotalHorasGuardiaDTO[]> {
  let params = new HttpParams();

  if (fechaDesde) {
    params = params.set('fechaDesde', fechaDesde);
  }
  if (fechaHasta) {
    params = params.set('fechaHasta', fechaHasta);
  }
  if (profesorFiltro && profesorFiltro !== 'null') {
    params = params.set('profesorFiltro', profesorFiltro);
  }
  if (perfil) {
    params = params.set('perfil', perfil);
  }

  return this.http.get<ProfesorTotalHorasGuardiaDTO[]>(this.apiUrl, { params });
}
}
