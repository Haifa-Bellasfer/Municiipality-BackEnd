import { DialogFournisseurComponent } from './../dialog-fournisseur/dialog-fournisseur.component';
import { FournisseurService } from './../../services/fournisseur.service';
import { Fournisseur } from './../../entity/fournisseur';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styleUrls: ['./fournisseur.component.scss'],
})
export class FournisseurComponent implements OnInit {
  // columns we will show on the table
  public displayedColumns = [
    '_id',
    'slug',
    'email',
    'active',
    'phone',
    'action',
  ];

  //the source where we will get the data
  public dataSource = new MatTableDataSource<Fournisseur>();

  constructor(
    public fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getFournisseurs();
  }

  getFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }

  addFournisseur() {
    localStorage.setItem('idRecalmation', this.route.snapshot.params.id);
    this.dialog.open(DialogFournisseurComponent);
  }
}
