import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reclamation } from 'src/app/entity/reclamation';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  constructor(private http: HttpClient) {}
  reclamations: any = [];
  //All Reclamations
  getReclamations(): Observable<Reclamation[]> {
    this.reclamations = this.http
      .get<any>(' http://localhost:3000/api/reclam/afficheAll')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.reclamations;
  }
}
