import { Component, ElementRef, ViewChild } from '@angular/core';
import { Project } from 'src/app/model/project.model';
import { ProjectService } from 'src/app/service/project/project.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  projects: any = new Project('', '', '', '', '', '');

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;
  saveState = 'Guardar';

  updateData() {
    this.projectService.getProject().subscribe((data) => {
      this.projects = data;
    });
  }

  hideModal() {
    const htmlBody: any = document.querySelector<HTMLElement>('body');
    htmlBody.style = '';

    const checkModalBackdrop = document.querySelector<HTMLElement>(
      '.modal-backdrop.fade.show'
    )
    if (checkModalBackdrop) {
      checkModalBackdrop.remove()
    }
  }

  createElement(event: any) {
    this.saveState = 'Guardando...';
    const id = event.target.id;

    const projectTitle: any = document.querySelector<HTMLInputElement>(
      `#createProjectTitle${id}`
    );
    const projectDescription: any = document.querySelector<HTMLInputElement>(
      `#createProjectDescription${id}`
    );
    const projectSkillsUsed: any = document.querySelector<HTMLInputElement>(
      `#createProjectSkillsUsed${id}`
    );
    const projectGitHub: any = document.querySelector<HTMLInputElement>(
      `#createProjectGithubLink${id}`
    );
    const projectWebPage: any = document.querySelector<HTMLInputElement>(
      `#createProjectWebpageLink${id}`
    );

    const formData = {
      title: projectTitle.value,
      body: projectDescription.value,
      skillsUsed: projectSkillsUsed.value,
      gitHubLink: projectGitHub.value,
      webPageLink: projectWebPage.value,
    };

    const request = new XMLHttpRequest();
    request.open('POST', `https://portfolio-backend-fjc1.onrender.com/projects/create`);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(formData));

    request.onreadystatechange = () => {
      if (request.status === 200) {
        this.saveState = 'Guardar';
        AlertComponent.setAlert('.success');
        this.updateData();
        this.hideModal();
      } else {
        AlertComponent.setAlert('.error');
      }
    };
  }

  deleteElement(event: any) {
    const confirm = window.confirm(
      'Estas seguro que desea borrar este elemento?'
    );

    if (confirm && this.projects.length > 1) {
      const request: any = new XMLHttpRequest();
      request.open(
        'DELETE',
        `https://portfolio-backend-fjc1.onrender.com/projects/delete/${event.currentTarget.id}`
      );
      request.send();

      request.onreadystatechange = () => {
        if (request.status === 200) {
          AlertComponent.setAlert('.success');
          this.updateData();
        } else {
          AlertComponent.setAlert('.error');
        }
      };
    } else if (confirm && this.projects.length === 1) {
      alert(
        'No se pudo borrar este elemento\nDebe haber al menos un elemento por sección.'
      );
    }
  }

  saveElement(event: any) {
    this.saveState = 'Guardando...';
    const id = event.target.id;
    const formData = new FormData();

    // Data
    const projectTitle: any = document.querySelector<HTMLInputElement>(
      `#projectTitle${id}`
    );
    const projectDescription: any = document.querySelector<HTMLInputElement>(
      `#projectDescription${id}`
    );
    const projectSkillsUsed: any = document.querySelector<HTMLInputElement>(
      `#projectSkillsUsed${id}`
    );
    const projectGitHub: any = document.querySelector<HTMLInputElement>(
      `#projectGithubLink${id}`
    );
    const projectWebPage: any = document.querySelector<HTMLInputElement>(
      `#projectWebpageLink${id}`
    );

    formData.append('title', projectTitle.value);
    formData.append('body', projectDescription.value);
    formData.append('skillsUsed', projectSkillsUsed.value);
    formData.append('gitHubLink', projectGitHub.value);
    formData.append('webPageLink', projectWebPage.value);

    const request = new XMLHttpRequest();
    request.open('PUT', `https://portfolio-backend-fjc1.onrender.com/projects/edit/${id}`);
    request.send(formData);

    request.onreadystatechange = () => {
      if (request.status === 200) {
        this.saveState = 'Guardar';
        AlertComponent.setAlert('.success');
        this.updateData();
        this.hideModal();
      } else {
        AlertComponent.setAlert('.error');
      }
    };
  }

  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    this.updateData();
  }
}
