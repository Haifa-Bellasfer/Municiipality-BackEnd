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
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  loginSubmit() {
    if (this.formGroup.invalid) {
      return;
    }

    this.authService.login(this.formGroup.value).subscribe((res) => {
      console.log('token', res);
      alert(res.message);
      this.router.navigate(['/dashboard']);
    });
  }
}
