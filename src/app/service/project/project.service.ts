import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  URL = 'https://portfolio-backend-fjc1.onrender.com/'
  constructor(private http: HttpClient) { }

  public getProject(): Observable<Project> {
    return this.http.get<Project>(this.URL + 'projects/get');
  }
}
