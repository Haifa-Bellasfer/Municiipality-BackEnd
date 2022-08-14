import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  error = '';
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  loginSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.formGroup.value).subscribe((res) => {
      console.log(res);
      if (res.user) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('userId', res.user._id);
        this.router.navigate(['/dashboard']);
      } else {
        this.error = res.message;
      }
    });
  }
}
