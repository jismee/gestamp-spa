import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl +  'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;

constructor(private http: HttpClient) { }

// ahora tenemos que agregar el metodo login
login(model: any) {
  // podría haber un tercer parametro, pero la api devuelve json
  return this.http.post(this.baseUrl + 'login', model)
    // la respuesta se obtiene como un observable y
    // necesitamos tener los datos lo antes posible y continuar
    // esperando a que esten preparados
    .pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          // necesitamos guardar el token por si se necesita
          // para otra llamada
          localStorage.setItem('token', user.token);
          // guardamos los datos del usuario en el localstorate
          localStorage.setItem('user', JSON.stringify(user.user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user;
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  // un metodo para comprobar si el token ha espirado
  // utilizando auth0 jwt plugin
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  /* getId() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    return this.decodedToken;
  } */
}
