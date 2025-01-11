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
  private apiUrl = 'http://localhost:3000/api/auth/'; // Replace with your actual API URL

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticated.next(!!token);
  }

  login(email: string, password: string): Promise<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.accessToken);
          localStorage.setItem('userId', response.user._id);
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

  signup(email: string, password: string): Promise<boolean> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/signup`, {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('auth_token', response.accessToken);
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
    // If your API has a logout endpoint, you can call it here
    return this.http
      .post(`${this.apiUrl}/logout`, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('auth_token');
          this.isAuthenticated.next(false);
        })
      )
      .toPromise()
      .catch((error) => {
        console.error('Logout error:', error);
        throw error;
      });
  }

  // Helper method to get the auth token
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated$() {
    return this.isAuthenticated.asObservable();
  }
}
