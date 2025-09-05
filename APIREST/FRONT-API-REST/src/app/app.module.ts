import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PersonasComponent } from './pages/personas/personas.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { AddEditPersonaComponent } from './components/add-edit-persona/add-edit-persona.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { AddEditUsuarioComponent } from './components/add-edit-usuario/add-edit-usuario.component';
import { CiudadesComponent } from './pages/ciudades/ciudades.component';
import { AddEditCiudadComponent } from './components/add-edit-ciudad/add-edit-ciudad.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PersonasComponent,
    NavbarComponent,
    AddEditPersonaComponent,
    UsuariosComponent,
    AddEditUsuarioComponent,
    CiudadesComponent,
    AddEditCiudadComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
