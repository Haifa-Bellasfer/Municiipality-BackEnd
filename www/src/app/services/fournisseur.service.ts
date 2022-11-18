import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../entity/fournisseur';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  httpOption = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  fournisseurs: any = [];

  // Liste fournisseur
  getFournisseurs(): Observable<Fournisseur[]> {
    return this.http
      .get<any>(' http://localhost:3000/api/fournisseur/list')
      .pipe(tap((result) => console.log('result-->', result)));
  }
  // Desactive fournisseur
  desactiveFournisseur(id: string, state: boolean): Observable<Fournisseur> {
    console.log(id);
    console.log(state);
    return this.http
      .put<any>(
        ' http://localhost:3000/api/fournisseur/active/' + id,
        { state: state },
        this.httpOption
      )
      .pipe(tap((result) => console.log('desactive-->', result)));
  }
}
