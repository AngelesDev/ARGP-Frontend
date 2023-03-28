import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Experience } from 'src/app/model/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  URL = 'http://localhost:8080/'
  constructor(private http: HttpClient) { }

  public getExperience(): Observable<Experience> {
    return this.http.get<Experience>(this.URL + 'experiences/get') // experiences/get/profile
  }
}
