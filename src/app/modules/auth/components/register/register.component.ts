import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

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
    private readonly router: Router,
    private readonly notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  @HostListener('window:keyup.enter', ['$event', 'undefined'])
  onRegister(): void {
    if (this.registerForm.valid) {
      if (
        this.registerForm.controls['password'].value !==
        this.registerForm.controls['confirmPassword'].value
      ) {
        this.registerForm.controls['password'].setErrors({ error: true });
        this.registerForm.controls['confirmPassword'].setErrors({
          error: true,
        });

        this.markFormGroupTouched(this.registerForm);

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
        .register(
          this.registerForm.value.email,
          this.registerForm.value.password
        )
        .then(
          () => {
            this.notifier.notify('success', 'Registration Successful!');
            this.isLoading = false;
            this.router.navigateByUrl('/main');
          },
          () => {
            this.notifier.notify('error', 'Something went wrong.');
            this.isLoading = false;
          }
        );
    } else {
      this.markFormGroupTouched(this.registerForm);
    }
  }
}
