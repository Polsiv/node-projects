import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AddEditUsuarioComponent } from './components/add-edit-usuario/add-edit-usuario.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { AddEditCiudadComponent } from './components/add-edit-ciudad/add-edit-ciudad.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'personas', component: PersonasComponent},
  { path: 'persona/:id', component: AddEditPersonaComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'usuario/:id', component: AddEditUsuarioComponent},
  { path: 'ciudades', component: CiudadesComponent},
  { path: 'ciudad/:id', component: AddEditCiudadComponent},
  { path: 'login', component: LoginComponent},

  { path: '**', pathMatch: 'full', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
