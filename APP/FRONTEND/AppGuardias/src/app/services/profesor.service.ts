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

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  private apiUrl = 'http://localhost:8080/api/profesores'; // URL de la API en backend

  //Se pasa al constructor una instancia de Angular para hacer solicitudes HTTP desde el frontend hacia el backend
  constructor(private http: HttpClient) { }

  //Método para obtener todos los profesores
  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

}
