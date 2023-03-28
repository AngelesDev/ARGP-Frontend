import { Component } from '@angular/core';
import { Persona } from 'src/app/model/persona.model';
import { PersonaService } from 'src/app/service/persona/persona.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  persona: Persona = new Persona("");

  constructor(public personaService: PersonaService) {}


  ngOnInit(): void {
    this.personaService.getPersona().subscribe(data => {
      this.persona = data;
    })
  }
}
