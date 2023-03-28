import { Component } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects: any = new Project('', '', '', '', '', '');

  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProject().subscribe(data => {
      this.projects = data;
    })
  }
}
