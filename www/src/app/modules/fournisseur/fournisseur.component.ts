import { FournisseurService } from './../../services/fournisseur.service';
import { Fournisseur } from './../../entity/fournisseur';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  // columns we will show on the table
  public displayedColumns = ['_id', 'slug', 'email', 'phone', 'action'];

  //the source where we will get the data
  public dataSource = new MatTableDataSource<Fournisseur>();

  constructor(public fournisseurService: FournisseurService) {}

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }
}
