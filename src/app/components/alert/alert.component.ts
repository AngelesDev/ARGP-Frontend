import { Component } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  static setAlert(alertClass: string) {
    const successAlert: any = document.querySelector(alertClass)
    successAlert.style.display = 'block';
    setTimeout(() => {
      successAlert.style.display = 'none';
    }, 6000)
  }
}
