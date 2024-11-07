import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

function equalValues(controlName1: string, controlName2: string) {
  return (control: AbstractControl) => {
    const value1 = control.get(controlName1)?.value;
    const value2 = control.get(controlName2)?.value;
    if (value1 === value2) {
      return null;
    }
    return { valuesDoNotMatch: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule],
})
export class SignupComponent {

  constructor(private router: Router) {}

  suForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required] }),

    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
  });

  onSubmit() {
    if (this.suForm.invalid) {
      console.log('INVALID FORM');
      return;
    }
    console.log(this.suForm);
  }

  onReset() {
    this.suForm.reset();
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }
}
