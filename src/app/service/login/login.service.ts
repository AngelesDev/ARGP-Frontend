import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUser } from 'src/app/model/new-user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  authURL = 'https://portfolio-backend-fjc1.onrender.com/'

  constructor(private httpClient: HttpClient) { }

  public newUser(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authURL + 'nuevo', newUser);
  }

  //public loginUser(loginUsuario: any) {
  //  return this.httpClient.post(this.authURL + 'login', loginUsuario)
  //}
}
