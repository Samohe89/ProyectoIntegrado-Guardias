import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Horario {
  numRegistro: number;
  grupo: string;
  aliasProfesor: string;
  asignatura: string;
  aula: string;
  dia: number;
  hora: number;
}

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'http://localhost:8080/api/horarios';

  constructor(private http: HttpClient) {}

  getHorariosProfesor(dniProfesor: string, cursoAcademico: string) {
    return this.http.get<any[]>(`${this.apiUrl}/profesor/${dniProfesor}/${cursoAcademico}`);
  }
}
