import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Reclamation } from 'src/app/entity/reclamation';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  httpOption = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  reclamations: any = [];
  reclamtionState: any = [];

  // Reclamations State InProgress
  getReclamations(): Observable<Reclamation[]> {
    this.reclamations = this.http
      .get<any>(' http://localhost:3000/api/reclamation/list')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.reclamations;
  }
  // Reclamations By state Pending
  getReclamationsByState(): Observable<Reclamation[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclamation/listByState')
      .pipe(tap((result) => console.log('result-->', result)));
  }
  //Reclamation By Id
  getReclamationByID(id: string): Observable<Reclamation> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclamation/getById/' + id)
      .pipe(tap((result) => console.log('result-->', result)));
  }

  //Update REclamation State
  updateReclamation(id: string): Observable<Reclamation> {
    return this.http
      .put<any>(
        ' http://localhost:3000/api/reclamation/update/' + id,
        this.httpOption
      )
      .pipe(tap((result) => console.log('resultUPdate-->', result)));
  }
}
