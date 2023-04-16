import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Persona } from '../../model/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  URL = 'https://portfolio-backend-fjc1.onrender.com/'
  constructor(private http: HttpClient) { }

  public getPersona(): Observable<Persona> {
    return this.http.get<Persona>(this.URL + 'personas/traer/perfil');
  }
}
