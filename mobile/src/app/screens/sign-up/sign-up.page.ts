import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
  standalone: false,
})
export class SignUpPage {
  signUpInfo = {
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'Citoyen',
  };
  focused: boolean = true;

  signUpForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required]],
    role: 'Citoyen',
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      role: 'Citoyen',
    });
  }

  async onSignup() {
    try {
      const success = await this.authService.signup(this.signUpInfo);
      if (success) {
        this.router.navigate(['/add-reclamation']);
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  get username() {
    return this.signUpForm.get('username');
  }
  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get address() {
    return this.signUpForm.get('address');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
