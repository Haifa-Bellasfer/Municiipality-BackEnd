import { Fournisseur } from './../entity/fournisseur';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.http
      .put<any>(
        ' http://localhost:3000/api/fournisseur/active/' + id,
        { state: state },
        this.httpOption
      )
      .pipe(tap((result) => console.log('desactive-->', result)));
  }
  // Ajout fournisseur
  addFournisseur(
    slug: string,
    email: string,
    password: string,
    categorie: string,
    addresse: string,
    phone: string
  ): Observable<Fournisseur[]> {
    return this.http
      .post<any>(' http://localhost:3000/api/fournisseur/add', {
        slug: slug,
        email: email,
        password: password,
        categorie: categorie,
        addresse: addresse,
        phone: phone,
      })
      .pipe(tap((result) => console.log('result-->', result)));
  }
}
