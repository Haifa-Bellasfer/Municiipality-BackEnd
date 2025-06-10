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
  addResponsable(
    matricule: string,
    nom: string,
    prenom: string,
    email: string,
    sexe: string,
    adresse: string,
    telephone: string,
    password: string,
    municipality: string
  ): Observable<Responsable> {
    return this.http
      .post<any>(' http://localhost:3000/api/responsable/add', {
        matricule: matricule,
        nom: nom,
        prenom: prenom,
        email: email,
        sexe: sexe,
        adresse: adresse,
        telephone: telephone,
        password: password,
        municipality: municipality,
      })
      .pipe(tap((result) => console.log('addresponsable-->', result)));
  }

  removeResponsable(id: string): Observable<Responsable> {
    return this.http
      .delete<Responsable>(
        ' http://localhost:3000/api/responsable/' + id,
        this.httpOption
      )
      .pipe(tap((result) => console.log('deleteed-->', result)));
  }
}
