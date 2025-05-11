import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'ausencias',
    loadComponent: () =>
      import('./listado-ausencias-profesor/listado-ausencias-profesor.component').then(
        m => m.ListadoAusenciasProfesorComponent
      )
  },
  {
    path: '',
    redirectTo: 'ausencias',
    pathMatch: 'full'
  }
];