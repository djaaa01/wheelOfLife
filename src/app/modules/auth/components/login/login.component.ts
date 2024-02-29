import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string;
  password: string;
  isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notifier: NotifierService
  ) {}

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onLogin(): void {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).then(
        () => {
          this.isLoading = false;
          this.router.navigate(['/goals']);
        },
        () => {
          this.notifier.notify('error', 'Something went wrong.');
          this.isLoading = false;
        }
      );
    }
  }
}
