import { Responsable } from 'src/app/entity/responsable';
import { ResponsableService } from './../../services/responsable.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogResponsableComponent } from '../dialog-responsable/dialog-responsable.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-responsable',
  templateUrl: './responsable.component.html',
  styleUrls: ['./responsable.component.scss'],
})
export class ResponsableComponent implements OnInit {
  displayedColumns: string[] = [
    'matricule',
    'nom',
    'prenom',
    'email',
    'sexe',
    'adresse',
    'telephone',
    'createdAt',
    'municipality',
    'actions',
  ];
  public dataSource = new MatTableDataSource<Responsable>();

  constructor(
    public responsableService: ResponsableService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getResponsable();
  }

  getResponsable() {
    this.responsableService.getResponable().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }

  openDialog() {
    this.dialog.open(DialogResponsableComponent);
  }
  removeResponsable(id: string) {
    this.responsableService.removeResponsable(id).subscribe((res) => {
      console.log('Responsable removed:', res);
      this.getResponsable(); // Refresh the list after deletion
    });
  }
}
