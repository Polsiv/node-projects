import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_LOCAL } from '../config/url.servicios';
import { map } from 'rxjs';
import { Persona } from '../interfaces/persona.interface';
import { Usuario } from '../interfaces/usuario.interface';
import { Ciudad } from '../interfaces/ciudad.interface';
import { AuthService } from '../auth/auth.service.service';

@Injectable({
  providedIn: 'root'
})
export class ConexionAPIService {
  constructor( public http: HttpClient,public service:AuthService) { }
  public getPersonas():any{
    let url = `${URL_LOCAL}/persona`;
    const headers_object = new HttpHeaders().set('x-token',this.service.getToken())
  
    return this.http.get(url,{headers:headers_object}).pipe(
      map((resp:any) => {
        console.log('Datos',resp)
        return resp.data;
  
      })
    )
  }

  crud_Personas(unaPersona: Persona, unaAccion: string):any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_LOCAL}/persona/${unaPersona.id_persona}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

  
    if (unaAccion === 'insertar') {
      //let parametros2 = new HttpParams();
      let url = URL_LOCAL+ '/persona';

      const body = {
        nombres:unaPersona.nombres,
        apellidos:unaPersona.apellidos,
        fecha_nacimiento:unaPersona.fecha_nacimiento
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      //let parametros = new HttpParams();

      let url = `${URL_LOCAL}/persona/${unaPersona.id_persona}`;

      const body = {
        nombres:unaPersona.nombres,
        apellidos:unaPersona.apellidos,
        fecha_nacimiento:unaPersona.fecha_nacimiento
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }

  getUnaPersona(unIdPersona:number): any {
    let url = `${URL_LOCAL}/persona/${unIdPersona}`;
    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
/*----------------------------------------------------------------------- */
public getUsuarios():any{
  let url = `${URL_LOCAL}/usuario`;
  const headers_object = new HttpHeaders().set('x-token',this.service.getToken())

  return this.http.get(url,{headers:headers_object}).pipe(
    map((resp:any) => {
      console.log('Datos',resp)
      return resp.data;

    })
  )

}
  crud_Usuarios(unUsuario: Usuario, unaAccion: string):any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_LOCAL}/usuario/${unUsuario.id_usuario}`;

      return this.http.delete(url).pipe(
        map((data) => {
          console.log(data)
          return data;
        })
      );
    }

  
    if (unaAccion === 'insertar') {
      //let parametros2 = new HttpParams();
      let url = URL_LOCAL+ '/usuario';
      const body = {
        contraseña:unUsuario.contrasena,
        email:unUsuario.email,
        numero_telefono: unUsuario.numero_telefono,
    minibiografia: unUsuario.minibiografia,
    id_persona: unUsuario.id_persona,
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      //let parametros = new HttpParams();

      let url = `${URL_LOCAL}/usuario/${unUsuario.id_usuario}`;

      const body = {
        contraseña:unUsuario.contrasena,
        email:unUsuario.email,
        numero_telefono: unUsuario.numero_telefono,
      minibiografia: unUsuario.minibiografia,
      id_persona: unUsuario.id_persona,
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }

  getUnUsuario(unIdUsuario:number): any {
    let url = `${URL_LOCAL}/usuario/${unIdUsuario}`;
    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
  /*----------------------------------------------------------------------- */

  public getCiudades():any{
    let url = `${URL_LOCAL}/ciudad`;
    const headers_object = new HttpHeaders().set('x-token',this.service.getToken())
  
    return this.http.get(url,{headers:headers_object}).pipe(
      map((resp:any) => {
        console.log('Datos',resp)
        return resp.data;
  
      })
    )
  }

  crud_Ciudades(unaCiudad: Ciudad, unaAccion: string):any {
    //console.log(unExpediente);

    if (unaAccion === 'eliminar') {
      let parametros2 = new HttpParams();

      let url = `${URL_LOCAL}/ciudad/${unaCiudad.id_ciudad}`;

      return this.http.delete(url).pipe(
        map((data) => {
          return data;
        })
      );
    }

  
    if (unaAccion === 'insertar') {
      //let parametros2 = new HttpParams();
      let url = URL_LOCAL+ '/ciudad';

      const body = {
        nombre:unaCiudad.nombre,
      };

      return this.http.post(url, body).pipe(map((data) => data));
    }

    if (unaAccion === 'modificar') {
      //let parametros = new HttpParams();

      let url = `${URL_LOCAL}/ciudad/${unaCiudad.id_ciudad}`;

      const body = {
        nombre:unaCiudad.nombre,
      };

      //console.log(parametros);
      return this.http.put(url, body).pipe(map((data) => data));
    }
  }

  getUnaCiudad(unIdCiudad:number): any {
    let url = `${URL_LOCAL}/ciudad/${unIdCiudad}`;
    return this.http.get(url).pipe(
      map((resp:any) => {
        console.log('DATOS', resp);
        return resp.data;
      })
    );
  }
}
