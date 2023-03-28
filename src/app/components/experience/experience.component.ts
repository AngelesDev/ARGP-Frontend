import { Component } from '@angular/core';
import { Experience } from 'src/app/model/experience.model';
import { ExperienceService } from 'src/app/service/experience/experience.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})

export class ExperienceComponent {
  experiences: any = new Experience('', '');

  constructor(public experienceService: ExperienceService) {}


  ngOnInit(): void {
    this.experienceService.getExperience().subscribe(data => {
      this.experiences = data;
    })
  }
}
