import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginData = {
    email: '',
    password: '',
  };

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  focused: boolean = true;
  errorMessage = undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  async onLogin() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const success = await this.authService.login(email, password);

        if (success) {
          if (localStorage.getItem('role') !== 'Fournisseur') {
            this.router.navigate(['/add-reclamation']);
          } else {
            this.router.navigate(['/list-reclamation']);
          }
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    } else {
      this.markFormGroupTouched(this.loginForm);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
