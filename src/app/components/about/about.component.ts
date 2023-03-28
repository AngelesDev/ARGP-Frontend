import { Component } from '@angular/core';
import { About } from 'src/app/model/about.model';
import { AboutService } from 'src/app/service/about/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent {
  about: About = new About("", "");

  constructor(public aboutService: AboutService) {}

  ngOnInit() {
    this.aboutService.getAbout().subscribe(data => {
      this.about = data;
    })      
  }
}