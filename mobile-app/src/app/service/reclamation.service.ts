import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  constructor(private http: HttpClient) {}

  addReclamation(data: any) {
    this.http.post('http://localhost:3000/api/reclamation/add', {
      description: data.description,
      categorie: data.categorie,
      localisation: data.localisation,
      etat: data.etat,
      imageURL: data.imageURL,
      citoyen: data.citoyenId,
    });
  }
  uploadImage(data: any): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'multipart/form-data'
    );

    return this.http.post('http://localhost:3000/api/upload/upload', data);
  }
}
