import { Component, DestroyRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { debounceTime } from 'rxjs';

import { AuthService } from '../auth.service';

const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  constructor(
    private destroyRef: DestroyRef,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const subscription = this.loginForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ username: value.username })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    if (
      this.loginForm.invalid ||
      !this.loginForm.value.username ||
      !this.loginForm.value.password
    ) {
      console.log('INVALID FORM');
      return;
    }
    const enteredUsername = this.loginForm.value.username;
    const enteredPassword = this.loginForm.value.password;

    this.authService.login(enteredUsername, enteredPassword).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }

  get emailIsInvalid() {
    return (
      this.loginForm.controls.username.touched &&
      this.loginForm.controls.username.dirty &&
      this.loginForm.controls.username.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.dirty &&
      this.loginForm.controls.password.invalid
    );
  }

  goToRegister() {
    this.router.navigate(['/auth/sign-up']);
  }
}
