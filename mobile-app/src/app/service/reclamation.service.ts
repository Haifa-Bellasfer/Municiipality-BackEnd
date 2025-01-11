import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReclamationService {
  constructor(private http: HttpClient) {}

  addReclamation(data: any): Observable<any> {
    let imageData = data.myImage;
    if (imageData && imageData.includes('base64,')) {
      imageData = imageData.split('base64,')[1];
    }
    return this.http.post(
      'http://localhost:3000/api/reclamation/add',
      {
        description: data.description,
        categorie: data.categorie,
        localisation: data.adresse,
        etat: data.etat,
        imageURL: data.myImage,
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
      `http://localhost:3000/api/reclamation/getReclamationByIdCitoyen/${id}`
    );
  }

  getReclamation(id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3000/api/reclamation/getReclamationById/${id}`,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
