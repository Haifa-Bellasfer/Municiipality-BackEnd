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
  reclamtionState: any = [];

  // Reclamations State InProgress
  getReclamations(): Observable<Reclamation[]> {
    this.reclamations = this.http
      .get<any>(' http://localhost:3000/api/reclam/afficheAll')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.reclamations;
  }
  // Reclamations By state Pending
  getReclamationsByState(): Observable<Reclamation[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclam/afficheByState')
      .pipe(tap((result) => console.log('result-->', result)));
  }
  //Reclamation By Id
  getReclamationByID(id: string): Observable<Reclamation> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclam/afficheById/' + id)
      .pipe(tap((result) => console.log('result-->', result)));
  }

  //Update REclamation State
  updateReclamation(id: string): Observable<Reclamation> {
    console.log(id);
    return this.http
      .get<any>(' http://localhost:3000/api/reclam/updateStat/' + id)
      .pipe(tap((result) => console.log('resultUpdate-->', result)));
  }
}
