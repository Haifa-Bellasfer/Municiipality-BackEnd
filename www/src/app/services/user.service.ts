import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/entity/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpOption = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  users: any = [];

  // Liste fournisseur
  getFournisseurs(): Observable<User[]> {
    this.users = this.http
      .get<any>(' http://localhost:3000/api/user/list/fournisseur')
      .pipe(tap((result) => console.log('fournisseurs-->', result)));
    return this.users;
  }
  // Liste responsable
  getResponable(): Observable<User[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/user/list/responsable')
      .pipe(tap((result) => console.log('responsable-->', result)));
  }
}
