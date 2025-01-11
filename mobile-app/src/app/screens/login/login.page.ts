import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formData = {
    email: '',
    password: '',
  };
  focused: boolean = true;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {}
  loginSubmit() {
    console.log('login', this.formData);
    this.loginService.login(this.formData).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/add-reclamation']);
    });
  }
}
