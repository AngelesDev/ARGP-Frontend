import { Component, ElementRef, ViewChild } from '@angular/core';
import { Education } from 'src/app/model/education.model';
import { EducationService } from 'src/app/service/education/education.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent {
  educations: any = new Education('');

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;

  updateData() {
    this.educationService.getEducation().subscribe((data) => {
      this.educations = data;
    });
  }

  hideModal() {
    const htmlBody: any = document.querySelector<HTMLElement>('body');
    htmlBody.style = '';
    document.querySelector<HTMLElement>(
      '.modal-backdrop.fade.show'
    )!.remove()
  }

  createElement(event: any) {
    const id = event.target.id;

    const educationName: any = document.querySelector<HTMLInputElement>(
      `#createEducationName${id}`
    );
    const educationDescription: any = document.querySelector<HTMLInputElement>(
      `#createEducationDescription${id}`
    );

    const formData = {
      title: educationName.value,
      body: educationDescription.value,
    };

    const request = new XMLHttpRequest();
    request.open('POST', `https://portfolio-backend-fjc1.onrender.com/education/create`);
    request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    request.send(JSON.stringify(formData));

    request.onreadystatechange = () => {
      if (request.status === 200) {
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

    if (confirm && this.educations.length > 1) {
      const request: any = new XMLHttpRequest();
      request.open(
        'DELETE',
        `https://portfolio-backend-fjc1.onrender.com/education/delete/${event.target.id}`
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
    } else if (confirm && this.educations.length === 1) {
      alert(
        'No se pudo borrar este elemento\nDebe haber al menos un elemento por sección.'
      );
    }
  }

  @ViewChild('educationTitle') educationTitle!: ElementRef;
  saveElement(event: any) {
    const id = event.target.id;
    const formData = new FormData();
    const educationName: any = document.querySelector<HTMLInputElement>(
      `#educationName${id}`
    );
    const educationDescription: any = document.querySelector<HTMLInputElement>(
      `#educationDescription${id}`
    );

    formData.append('title', educationName.value);
    formData.append('body', educationDescription.value);

    const request = new XMLHttpRequest();
    request.open('PUT', `https://portfolio-backend-fjc1.onrender.com/education/edit/${id}`);
    request.send(formData);

    request.onreadystatechange = () => {
      if (request.status === 200) {
        AlertComponent.setAlert('.success');
        this.updateData();
        this.hideModal();
      } else {
        AlertComponent.setAlert('.error');
      }
    };
  }

  constructor(public educationService: EducationService) {}

  ngOnInit(): void {
    this.educationService.getEducation().subscribe((data) => {
      this.educations = data;
    });
  }
}
