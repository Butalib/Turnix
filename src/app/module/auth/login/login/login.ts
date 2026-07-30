import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  form: FormGroup;
  errorMessage = '';
  private toastr = inject(ToastrService);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Please enter a valid email and password.';
      this.toastr.error(this.errorMessage);
      return;
    }

    const { email, password } = this.form.value;
    const success = this.authService.login(email, password);

    if (success) {
      this.toastr.success('Login successful');
      this.router.navigate(['/dashboard']);
      console.log('Login successful');
    } else {
      this.errorMessage = 'Invalid email or password.';
      this.toastr.error(this.errorMessage);
      this.form.markAllAsTouched();
    }
  }
}
