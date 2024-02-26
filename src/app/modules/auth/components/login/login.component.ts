import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

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
    private readonly router: Router
  ) { }

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onLogin(): void {
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).then(() => {
        this.isLoading = false;
        this.router.navigate(['/goals']);
      }, () =>
        this.isLoading = false);
    }
  }
}
