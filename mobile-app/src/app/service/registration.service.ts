import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  SignUp(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/user/signUp', data);
  }
}
