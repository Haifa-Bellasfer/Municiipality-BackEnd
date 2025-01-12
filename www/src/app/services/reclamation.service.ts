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
  private apiUrl = 'http://localhost:3000/reclamations/countByStatus';

  constructor(private http: HttpClient) {}

  reclamations: any = [];
  reclamtionState: any = [];

  // Reclamations State InProgress
  getReclamationsByStatus(status: string): Observable<Reclamation[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/reclamation/list/' + status)
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

  //Update REclamation done
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
  //Update REclamation to Verified
  updateReclamationVerified(
    id: string,
    fournisseur: string,
    status: string,
    noteResponsable?: string
  ): Observable<Reclamation> {
    return this.http
      .put<any>(
        ' http://localhost:3000/api/reclamation/update/' + id,

        { fournisseur, etat: status, noteResponsable },
        this.httpOption
      )
      .pipe(tap((result) => console.log('resultUPdate-->', result)));
  }

  //fournisseur reclamation
  getReclamationFournisseur(id: string): Observable<Reclamation[]> {
    return this.http
      .get<any>(
        ' http://localhost:3000/api/reclamation/listfournisseurReclamation/' +
          id
      )
      .pipe(tap((result) => console.log('fournisseur reclamation-->', result)));
  }

  countReclamationsByStatus(
    statue: string
  ): Observable<{ numberOfReclamations: number }> {
    return this.http
      .get<any>('http://localhost:3000/api/reclamation/countByStatus/' + statue)
      .pipe(tap((result) => console.log('number of  reclamation -->', result)));
  }
  countReclamationsByCategory(
    category: string
  ): Observable<{ numberOfReclamations: number }> {
    return this.http.post<{ numberOfReclamations: number }>(this.apiUrl, {
      category,
    });
  }
}
