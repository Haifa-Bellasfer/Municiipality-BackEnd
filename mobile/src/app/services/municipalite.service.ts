import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Municipalite } from '../interface/Municipality';

@Injectable({
  providedIn: 'root',
})
export class MunicipaliteService {
  constructor(private http: HttpClient) {}

  getMunicipalites(): Observable<Municipalite[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/municipality/list')
      .pipe(tap((result) => console.log('result-->', result)));
  }
}
