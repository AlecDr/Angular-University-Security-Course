import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from '@angular/forms';
import { confirmPassword } from '../validators/password-confirm.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../common/forms.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: string = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: new FormControl('test@gmail.com', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('123123', [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirm: new FormControl('123123', [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  ngOnInit() {}

  signUp() {
    const val = this.form.value;

    if (val.email && val.password && val.password == val.confirm) {
      this.authService.signUp(val.email, val.password).subscribe(
        () => {
          this.router.navigate(['lessons']);
        },
        error => {
          this.error = error.error.message;
          this.resetForm();
        }
      );
    }
  }

  closeErrorMessage() {
    this.error = null;
  }

  resetForm() {
    this.form.patchValue({
      password: '',
      confirm: ''
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  get confirm(): AbstractControl {
    return this.form.get('confirm');
  }

  passwordsMatch(): boolean {
    return this.form.get('password').value === this.form.get('confirm').value;
  }
}
