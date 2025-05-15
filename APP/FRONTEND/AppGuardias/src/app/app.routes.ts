import { Routes } from '@angular/router';
import { RegistroAusenciaComponent } from './components/registro-ausencia/registro-ausencia.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'registro-ausencia',
    component: RegistroAusenciaComponent
  },
  {path: "login", component: LoginComponent }

];
