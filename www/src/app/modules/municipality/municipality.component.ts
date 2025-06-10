import { Component, OnInit } from '@angular/core';
import { Municipalite } from 'src/app/entity/municipalite';
import { MunicipaliteService } from 'src/app/services/municipalite.service';

@Component({
  selector: 'app-municipality',
  templateUrl: './municipality.component.html',
  styleUrls: ['./municipality.component.scss'],
})
export class MunicipalityComponent implements OnInit {
  displayedColumns: string[] = ['region', 'adresse', 'actions'];
  dataSource: Municipalite[] = [];
  constructor(private municipaliteService: MunicipaliteService) {}

  ngOnInit(): void {
    this.loadMunicipalites();
  }

  loadMunicipalites() {
    this.municipaliteService.getMunicipalites().subscribe((data: any[]) => {
      this.dataSource = data;
    });
  }
  removeMunicipality(id: string) {
    // this.municipaliteService.removeMunicipalite(id).subscribe((res) => {
    //   console.log('Municipality removed:', res);
    //   this.loadMunicipalites(); // Refresh the list after deletion
    // });
  }
}
