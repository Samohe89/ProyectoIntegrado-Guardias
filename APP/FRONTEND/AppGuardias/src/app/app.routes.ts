import { Routes } from '@angular/router';
import { RegistroAusenciaDirectivoComponent } from './components/registro-ausencia-directivo/registro-ausencia-directivo.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {
    path: 'registro-ausencia-profesor',
    component: RegistroAusenciaDirectivoComponent
  },
  {path: "login", component: LoginComponent }

];
