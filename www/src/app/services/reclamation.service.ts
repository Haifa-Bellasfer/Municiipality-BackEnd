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
  getReclamationsInprogress(): Observable<Reclamation[]> {
    this.reclamations = this.http
      .get<any>(' http://localhost:3000/api/reclamation/list/inprogress')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.reclamations;
  }
  // Reclamations By state Pending
  getReclamationsPending(): Observable<Reclamation[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclamation/list/pending')
      .pipe(tap((result) => console.log('result-->', result)));
  }
  //Reclamation By Id
  getReclamationByID(id: string): Observable<Reclamation> {
    return this.http
      .get<any>(
        ' http://localhost:3000/api/reclamation/getReclamationById/' + id
      )
      .pipe(tap((result) => console.log('result-->', result)));
  }

  //Update REclamation State
  updateReclamation(
    id: string,
    idFournisseur: string
  ): Observable<Reclamation> {
    return this.http
      .put<any>(
        ' http://localhost:3000/api/reclamation/update/' + id,
        { fournisseur: idFournisseur },
        this.httpOption
      )
      .pipe(tap((result) => console.log('resultUPdate-->', result)));
  }
}
