import { Component } from '@angular/core';
import { Education } from 'src/app/model/education.model';
import { EducationService } from 'src/app/service/education/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent {
  educations: any = new Education('');

  constructor(public educationService: EducationService) {}


  ngOnInit(): void {
    this.educationService.getEducation().subscribe(data => {
      this.educations = data;
    })
  }
}
