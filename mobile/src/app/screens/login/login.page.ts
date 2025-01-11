import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  focused: boolean = true;
  errorMessage = undefined;

  constructor(private router: Router, private authService: AuthService) {}

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  ngOnInit() {}

  async onLogin() {
    try {
      const success = await this.authService.login(
        this.loginData.email,
        this.loginData.password
      );
      if (success) {
        this.router.navigate(['/add-reclamation']);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
