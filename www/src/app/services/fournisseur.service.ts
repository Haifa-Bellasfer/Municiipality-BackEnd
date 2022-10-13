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
    this.fournisseurs = this.http
      .get<any>(' http://localhost:3000/api/fournisseur/list')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.fournisseurs;
  }
}
