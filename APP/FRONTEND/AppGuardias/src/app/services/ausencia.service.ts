import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProfesorId {
  dniProfesor: string;
  cursoAcademico: string;
}

export interface Profesor {
  id: ProfesorId;
  nombreProfesor: string;
  usuario: string;
  claveProfesor: string;
  alias: string;
  nombreDepartamento: string;
  email: string;
}

export interface Horario {
  numRegistro: number;
  grupo: string;
  aliasProfesor: string;
  asignatura: string;
  aula: string;
  dia: number;
  hora: number;
  profesor: Profesor;
}

export interface Ausencia {
  id?: number;
  fechaAusencia: string;
  comentario: string;
  tarea: string;
  fichero?: any;
  profesor: Profesor;
  horariosProfesor: Horario;
}

@Injectable({
  providedIn: 'root'
})
export class AusenciaService {
  private apiUrl = 'http://localhost:8080/api/ausencias/registroAusencia';

  constructor(private http: HttpClient) {}

  crearRegistroAusencia(ausencia: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, ausencia);
  }

  getAll(): Observable<Ausencia[]> {
    return this.http.get<Ausencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ausencia> {
    return this.http.get<Ausencia>(`${this.apiUrl}/${id}`);
  }

  create(ausencia: Ausencia): Observable<Ausencia> {
    return this.http.post<Ausencia>(this.apiUrl, ausencia);
  }

  update(id: number, ausencia: Ausencia): Observable<Ausencia> {
    return this.http.put<Ausencia>(`${this.apiUrl}/${id}`, ausencia);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
