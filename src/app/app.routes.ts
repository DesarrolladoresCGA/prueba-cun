import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SoketsComponent } from './components/sokets/sokets.component';
import { DetailsComponent } from './components/details/details.component';
import { verificarGuard } from './guard/verificar.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { tokenGuard } from './guard/token.guard';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'soket', component:SoketsComponent},
    {path: 'details/:name', canActivate:[verificarGuard] , component:DetailsComponent},
    {path: 'login' , component:LoginComponent},
    {path: 'dashboard', canActivate:[tokenGuard],component:DashboardComponent},
    {path: '**', component:HomeComponent},

];
