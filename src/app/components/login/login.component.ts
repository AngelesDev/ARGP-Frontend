import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  // States

  logoutBtnIsVisible = false;
  loginBtnIsVisible = true;

  ngOnInit(): void {
    const isLoggedIn: any = sessionStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      this.loginBtnIsVisible = false;
      this.logoutBtnIsVisible = true;
    } else {
      this.loginBtnIsVisible = true;
      this.logoutBtnIsVisible = false;
    }
  }

  hideModal?: () => void;
  showModal?: () => void;

  ngAfterViewInit(): void {
    this.hideModal = () => {
      const modal: any = document.querySelector<HTMLElement>('#formModal');

      const modalBackdrop: any =
        document.querySelector<HTMLElement>('.modal-backdrop');

      const modalBodyScroll: any =
        document.querySelector<HTMLElement>('.modal-open');

      modalBodyScroll.style = '';
      modal.hidden = true;
      modalBackdrop.style.display = 'none';
    };

    this.showModal = () => {
      const modal: any = document.querySelector<HTMLElement>('#formModal');

      const modalBackdrop: any =
        document.querySelector<HTMLElement>('.modal-backdrop');

      modal.hidden = false;
      modalBackdrop.style.display = 'block';
    };
  }

  hideOrShowModal() {
    this.showModal!();
  }

  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  // Logout button
  logout() {
    let confirmLogout = confirm('¿Está seguro que desea cerrar sesión?');

    if (confirmLogout) {
      sessionStorage.removeItem('isLoggedIn');
      window.location.reload();
    }
  }

  // Submit form
  submit() {
    const usernameFrontend = this.username.nativeElement.value;
    const passwordFrontend = this.password.nativeElement.value;

    fetch('http://localhost:8080/user/get')
      .then((res) => res.json())
      .then((res) => {
        if (
          res[0].username === usernameFrontend &&
          res[0].password === passwordFrontend
        ) {
          sessionStorage.setItem('isLoggedIn', 'true');
          this.logoutBtnIsVisible = true;
          this.loginBtnIsVisible = false;
          //if (this.hideModal) this.hideModal();
          window.location.reload();
        }
      });

    event?.preventDefault();
  }
}
