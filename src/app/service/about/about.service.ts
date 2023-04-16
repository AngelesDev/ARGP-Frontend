import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { About } from '../../model/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  URL = 'https://portfolio-backend-fjc1.onrender.com/'
  constructor(private http: HttpClient) { }

  public getAbout(): Observable<About> {
    return this.http.get<About>(this.URL + 'about/traer/perfil');
  }
}
