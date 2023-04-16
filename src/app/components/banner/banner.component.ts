import { Component, ElementRef, ViewChild } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona/persona.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent {
  persona: Persona = new Persona('');

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;

  updateData() {
    this.personaService.getPersona().subscribe((data) => {
      this.persona = data;
    });
  }

  deleteElement() {
    // Si se borra el elemento, la página crashea debido a que el elemento es nulo, por eso solo se deja un string vacio.
    const confirm = window.confirm(
      'Estas seguro que desea borrar este elemento?'
    );

    if (confirm) {
      this.persona = new Persona('');

      const formData = new FormData();
      formData.append('nombre', '');

      const request = new XMLHttpRequest();
      request.open('PUT', 'https://portfolio-backend-fjc1.onrender.com/personas/editar/1');
      request.send(formData);

      request.onreadystatechange = () => {
        if (request.status === 200) {
          AlertComponent.setAlert('.success');
          this.updateData();
        } else {
          AlertComponent.setAlert('.error');
        }
      };
    }
  }

  editElement() {
    {
      this.convertToTextarea
        ? (this.convertToTextarea = false)
        : (this.convertToTextarea = true);
    }
  }

  @ViewChild('name') name!: ElementRef;
  saveElement() {
    const formData = new FormData();
    formData.append('nombre', this.name.nativeElement.value);

    const request = new XMLHttpRequest();
    request.open('PUT', 'https://portfolio-backend-fjc1.onrender.com/personas/editar/1');
    request.send(formData);

    request.onreadystatechange = () => {
      if (request.status === 200) {
        AlertComponent.setAlert('.success');
        this.updateData();
        this.convertToTextarea = false;
      } else {
        AlertComponent.setAlert('.error');
      }
    };
  }

  constructor(public personaService: PersonaService) {}

  ngOnInit(): void {
    this.personaService.getPersona().subscribe((data) => {
      this.persona = data;
    });
  }
}
