import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interface/user';

interface AuthResponse {
  user: User;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private apiUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticated.next(!!token);
  }

  login(email: string, password: string): Promise<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}auth/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('userId', response.user._id);
          localStorage.setItem('role', response.user.role);
          this.isAuthenticated.next(true);
        })
      )
      .toPromise()
      .then(() => true)
      .catch((error) => {
        console.error('Login error:', error);
        throw error;
      });
  }

  signup(signUpInfo: {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
  }): Promise<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}user/signup`, signUpInfo)
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('userId', response.user._id);
          localStorage.setItem('role', response.user.role);
          this.isAuthenticated.next(true);
        })
      )
      .toPromise()
      .then(() => true)
      .catch((error) => {
        console.error('Signup error:', error);
        throw error;
      });
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    this.isAuthenticated.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }
}
