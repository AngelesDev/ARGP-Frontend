import { Component, ElementRef, ViewChild } from '@angular/core';
import { About } from 'src/app/model/about.model';
import { ProfileImage } from 'src/app/model/profileImage.model';
import { AboutService } from 'src/app/service/about/about.service';
import { FileUploadService } from 'src/app/service/file-upload/file-upload.service';
import { map } from 'rxjs/operators';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  about: About = new About('', '');
  profileImage: any = new ProfileImage('', '', '');

  updateData() {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });
  }

  constructor(
    public aboutService: AboutService,
    private uploadService: FileUploadService
  ) {}

  // Edit Mode
  editMode = sessionStorage.getItem('isLoggedIn');
  convertToTextarea = false;

  @ViewChild('description') description!: ElementRef;
  // @ViewChild('img') img!: ElementRef;

  path: String = '';

  deleteElement() {
    // Si se borra el elemento, la página crashea debido a que el elemento es nulo, por eso solo se deja un string vacio.
    const confirm = window.confirm(
      'Estas seguro que desea borrar este elemento?'
    );

    if (confirm) {
      this.about = new About('', '');

      const formData = new FormData();
      formData.append('body', '');

      const request = new XMLHttpRequest();
      request.open('PUT', 'http://localhost:8080/about/editar/1');
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

  saveElement() {
    const formData = new FormData();
    formData.append('body', this.description.nativeElement.value);

    const request = new XMLHttpRequest();
    request.open('PUT', 'http://localhost:8080/about/editar/1');
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

  fileUploads?: any[];
  image: any;
  ngOnInit() {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });

    this.uploadService
      .getFiles(6)
      .snapshotChanges()
      .pipe(
        map((changes: any) =>
          // store the key
          changes.map((c: any) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe((fileUploads) => {
        this.fileUploads = fileUploads;
        const lastImageUploaded = fileUploads.slice(-1);
        this.image = lastImageUploaded[0].url;
      });
  }
}
