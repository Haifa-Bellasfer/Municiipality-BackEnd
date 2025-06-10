import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    if (localStorage.getItem('role') === 'Citoyen') {
      return this.http.post('http://localhost:3000/api/citoyen/signUp', data);
    } else {
      return this.http.post(
        'http://localhost:3000/api/fournisseur/signUp',
        data
      );
    }
  }
}
