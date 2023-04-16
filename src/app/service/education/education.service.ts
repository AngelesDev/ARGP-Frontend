import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Education } from 'src/app/model/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  URL = 'https://portfolio-backend-fjc1.onrender.com/'
  constructor(private http: HttpClient) { }

  public getEducation(): Observable<Education> {
    return this.http.get<Education>(this.URL + 'education/get') 
  }
}
