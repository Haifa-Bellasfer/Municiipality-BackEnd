import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-municipality-details',
  templateUrl: './municipality-details.component.html',
  styleUrls: ['./municipality-details.component.scss'],
})
export class MunicipalityDetailsComponent implements OnInit {
  municipalityId: string = '';
  fournisseurs: any[] = [];
  reclamations: any[] = [];
  responsables: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.municipalityId = this.route.snapshot.paramMap.get('id') || '';
    this.http
      .get<any>(
        `http://localhost:3000/api/municipality/details/${this.municipalityId}`
      )
      .subscribe((data) => {
        this.fournisseurs = data.fournisseurs || [];
        this.reclamations = data.reclamations || [];
        this.responsables = data.responsables || [];
      });
  }
}
