import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-sign-upp',
  templateUrl: './sign-upp.page.html',
  styleUrls: ['./sign-upp.page.scss'],
})
export class SignUppPage implements OnInit {
  formData = {
    username: '',
    email: '',
    password: '',
    addresse: '',
    phone: '',
  };
  focused: boolean = true;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  constructor(
    private registrationService: RegistrationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ddd');
  }
  registrationSubmit() {
    console.log('ahawa login', this.formData);
    this.registrationService
      .SignUp({ ...this.formData, role: 'Citoyen' })
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/reclamation']);
      });
  }
}
