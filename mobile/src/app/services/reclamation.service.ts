import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  constructor(private http: HttpClient) {}

  addReclamation(data: any): Observable<any> {
    return this.http.post(
      'http://localhost:3000/api/reclamation/add',
      {
        description: data.description,
        categorie: data.categorie,
        localisation: data.adresse,
        etat: data.etat,
        imageURL: data.imageURL,
        citoyen: data.citoyen,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  uploadImage(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );
    return this.http.post('http://localhost:3000/api/upload/upload', data);
  }

  getMyReclamations(id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/reclamation/${
        localStorage.getItem('role') !== 'Fournisseur'
          ? 'getReclamationByIdCitoyen'
          : 'getReclamationsByIdFournisseur'
      }/${id}`
    );
  }

  updateReclamationByFournisseur(data: any): Observable<any> {
    return this.http.put(
      'http://localhost:3000/api/reclamation/update/' + data.id,
      {
        etat: data.etat,
        noteFournisseur: data.noteFournisseur,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  getReclamation(id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/reclamation/getReclamationById/${id}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
