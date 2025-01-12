import { Component } from '@angular/core';
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
    role: 'Citoyen',
    password: '',
    phone: '',
    address: '',
  };
  focused: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

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

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
