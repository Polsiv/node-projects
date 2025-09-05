import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { URL_LOCAL } from '../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${URL_LOCAL}/usuario`;

  constructor(private http: HttpClient) {
    
  }

  login(credentials: { email: string; contraseña: string }): Observable<any> {
    return this.http.post(this.apiUrl+"/login", credentials); // Envía el email y contraseña al backend
  }

  public getToken():any{
    let token = localStorage.getItem('x-token')!
    console.log("Token Auth ",token)
    if(token.length > 0){
      return token
    }else{
      return "No existe Token"
    }
   
    // const httpOptions = {
    //   headers: new HttpHeaders().set('x-token', token!)
    // }
    // return httpOptions
    // console.log("options...",httpOptions)
    // return firstValueFrom(
    //   this.http.get<any[]>(this.apiUrl,httpOptions)
    
  }

  logout(){
    localStorage.clear()
  }

  }