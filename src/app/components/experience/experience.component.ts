import { Component, ElementRef, ViewChild } from '@angular/core';
import { Experience } from 'src/app/model/experience.model';
import { ExperienceService } from 'src/app/service/experience/experience.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent {
  experiences: any = new Experience('', '');

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;
  saveState = 'Guardar';

  updateData() {
    this.experienceService.getExperience().subscribe((data) => {
      this.experiences = data;
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

    const experienceName: any = document.querySelector<HTMLInputElement>(
      `#createExperienceName${id}`
    );
    const experienceDescription: any = document.querySelector<HTMLInputElement>(
      `#createExperienceDescription${id}`
    );

    const formData = {
      title: experienceName.value,
      body: experienceDescription.value,
    };

    const request = new XMLHttpRequest();
    request.open('POST', `https://portfolio-backend-fjc1.onrender.com/experiences/create`);
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

    if (confirm && this.experiences.length > 1) {
      const request: any = new XMLHttpRequest();
      request.open(
        'DELETE',
        `https://portfolio-backend-fjc1.onrender.com/experiences/delete/${event.currentTarget.id}`
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
    } else if (confirm && this.experiences.length === 1) {
      alert(
        'No se pudo borrar este elemento\nDebe haber al menos un elemento por sección.'
      );
    }
  }

  saveElement(event: any) {
    this.saveState = 'Guardando...';
    const id = event.target.id;
    const formData = new FormData();
    const experienceName: any = document.querySelector<HTMLInputElement>(
      `#experienceName${id}`
    );
    const experienceDescription: any = document.querySelector<HTMLInputElement>(
      `#experienceDescription${id}`
    );

    formData.append('title', experienceName.value);
    formData.append('body', experienceDescription.value);

    const request = new XMLHttpRequest();
    request.open('PUT', `https://portfolio-backend-fjc1.onrender.com/experiences/edit/${id}`);
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

  constructor(public experienceService: ExperienceService) {}

  ngOnInit(): void {
    this.experienceService.getExperience().subscribe((data) => {
      this.experiences = data;
    });
  }
}
