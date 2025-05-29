import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Responsable } from 'src/app/entity/responsable';

@Injectable({
  providedIn: 'root',
})
export class ResponsableService {
  httpOption = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getResponable(): Observable<Responsable[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/responsable/list')
      .pipe(tap((result) => console.log('responsable-->', result)));
  }
}
