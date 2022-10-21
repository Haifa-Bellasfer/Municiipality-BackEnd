import { Observable } from 'rxjs';
import { Archive } from './../entity/archive';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArchiveService {
  httpOption = {
    headers: new HttpHeaders({ 'content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}
  archives: any = [];

  // Liste archive
  getArchives(): Observable<Archive[]> {
    this.archives = this.http
      .get<any>(' http://localhost:3000/api/archieve/list')
      .pipe(tap((result) => console.log('result-->', result)));
    return this.archives;
  }
}
