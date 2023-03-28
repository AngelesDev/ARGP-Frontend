import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/model/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  URL = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }

  public getProject(): Observable<Project> {
    return this.http.get<Project>(this.URL + 'projects/get');
  }
}
