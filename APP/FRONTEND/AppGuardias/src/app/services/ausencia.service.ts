import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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
  providedIn: 'root',
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

  getAusenciasEntreFechasPorProfesorGuardia(
    fechaDesde: string,
    fechaHasta: string,
    profesorGuardia: string
  ): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/filtroGuardias?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&profesorGuardia=${profesorGuardia}`
    );
  }

  subirTarea(formData: FormData): Observable<string> {
    return this.http.post(`${this.apiUrl}/subir-tarea`, formData, {
      responseType: 'text',
    });
  }

  cargarFicheroTarea(idAusencia: number): Observable<HttpResponse<Blob>> {
    return this.http.get(`${this.apiUrl}/${idAusencia}/fichero`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  eliminarFicheroTarea(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}/fichero`, {
      responseType: 'text',
    });
  }

  modificarTarea(id: number, tareaTexto: string): Observable<Ausencia> {
    // Solo enviar el campo tarea, para evitar sobrescribir todo
    return this.http.put<Ausencia>(`${this.apiUrl}/${id}`, {
      tarea: tareaTexto,
    });
  }

  getAll(): Observable<Ausencia[]> {
    return this.http.get<Ausencia[]>(this.apiUrl);
  }

  getById(id: number): Observable<Ausencia> {
    return this.http.get<Ausencia>(`${this.apiUrl}/${id}`);
  }

  /*
  create(ausencia: Ausencia): Observable<Ausencia> {
    return this.http.post<Ausencia>(this.apiUrl, ausencia);
  }

  update(id: number, ausencia: Ausencia): Observable<Ausencia> {
    return this.http.put<Ausencia>(`${this.apiUrl}/${id}`, ausencia);
  }*/

  eliminarTarea(id: number): Observable<Ausencia> {
    return this.http.put<Ausencia>(
      `http://localhost:8080/api/ausencias/${id}/eliminar-tarea`,
      null
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
