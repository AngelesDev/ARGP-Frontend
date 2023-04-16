import { Component, ElementRef, ViewChild } from '@angular/core';
import { Skill } from 'src/app/model/skill.model';
import { SkillService } from 'src/app/service/skill/skill.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-hard-soft-skills',
  templateUrl: './hard-soft-skills.component.html',
  styleUrls: ['./hard-soft-skills.component.css'],
})
export class HardSoftSkillsComponent {
  skills: any = new Skill('', '');

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;
  saveState = 'Guardar';

  updateData() {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
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

    const skillName: any = document.querySelector<HTMLInputElement>(
      `#createSkillName${id}`
    );
    const skillDescription: any = document.querySelector<HTMLInputElement>(
      `#createSkillLevel${id}`
    );

    const formData = {
      name: skillName.value,
      level: skillDescription.value,
    };

    const request = new XMLHttpRequest();
    request.open('POST', `https://portfolio-backend-fjc1.onrender.com/skills/create`);
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

    if (confirm && this.skills.length > 1) {
      const request: any = new XMLHttpRequest();
      request.open(
        'DELETE',
        `https://portfolio-backend-fjc1.onrender.com/skills/delete/${event.currentTarget.id}`
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
    } else if (confirm && this.skills.length === 1) {
      alert(
        'No se pudo borrar este elemento\nDebe haber al menos un elemento por sección.'
      );
    }
  }

  saveElement(event: any) {
    this.saveState = 'Guardando...';
    const id = event.target.id;
    const formData = new FormData();
    const skillName: any = document.querySelector<HTMLInputElement>(
      `#skillName${id}`
    );
    const skillLevel: any = document.querySelector<HTMLInputElement>(
      `#skillLevel${id}`
    );

    formData.append('name', skillName.value);
    formData.append('level', skillLevel.value);

    const request = new XMLHttpRequest();
    request.open('PUT', `https://portfolio-backend-fjc1.onrender.com/skills/edit/${id}`);
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

  constructor(public skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }
}
