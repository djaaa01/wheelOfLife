import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onRegister(): void {
    if (
      this.registerForm.controls['password'].value !==
      this.registerForm.controls['confirmPassword'].value
    ) {
      this.registerForm.controls['password'].setErrors({ error: true });
      this.registerForm.controls['confirmPassword'].setErrors({ error: true });

      return;
    } else if (
      this.registerForm.controls['password'].value &&
      this.registerForm.controls['confirmPassword'].value
    ) {
      this.registerForm.controls['password'].setErrors(null);
      this.registerForm.controls['confirmPassword'].setErrors(null);
    }

    this.isLoading = true;
    this.authService
      .register(this.registerForm.value.email, this.registerForm.value.password)
      .then(() => {
        this.isLoading = false;
        this.router.navigateByUrl('/main');
      }, () =>
        this.isLoading = false);
  }
}
