import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroAusenciaComponent } from './components/registro-ausencia/registro-ausencia.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent },
    { path: "registro-ausencia", component: RegistroAusenciaComponent },

];
