import { Component } from '@angular/core';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/service/skill/skill.service';

@Component({
  selector: 'app-hard-soft-skills',
  templateUrl: './hard-soft-skills.component.html',
  styleUrls: ['./hard-soft-skills.component.css']
})
export class HardSoftSkillsComponent {
  skills: any = new Skill('', '');

  constructor(public skillService: SkillService) {}


  ngOnInit(): void {
    this.skillService.getSkills().subscribe(data => {
      this.skills = data;
    })
  }
}
