import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../service/registration.service';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  return = LoginPage;
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
