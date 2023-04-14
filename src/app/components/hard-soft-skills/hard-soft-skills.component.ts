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

  updateData() {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
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
    request.open('POST', `http://localhost:8080/skills/create`);
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

    if (confirm && this.skills.length > 1) {
      const request: any = new XMLHttpRequest();
      request.open(
        'DELETE',
        `http://localhost:8080/skills/delete/${event.currentTarget.id}`
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

  @ViewChild('skillTitle') skillTitle!: ElementRef;
  saveElement(event: any) {
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
    request.open('PUT', `http://localhost:8080/skills/edit/${id}`);
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

  constructor(public skillService: SkillService) {}

  ngOnInit(): void {
    this.skillService.getSkills().subscribe((data) => {
      this.skills = data;
    });
  }
}
