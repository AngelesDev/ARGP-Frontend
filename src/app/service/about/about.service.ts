import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { About } from '../../model/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  URL = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }

  public getAbout(): Observable<About> {
    return this.http.get<About>(this.URL + 'about/traer/perfil');
  }
}
