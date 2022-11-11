import { Component, OnInit, Inject } from '@angular/core';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posts',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class reclamationsComponent implements OnInit {
  reclamations: any;
  // columns we will show on the table
  public displayedColumns = [
    '_id',
    'categorie',
    'localisation',
    'etat',
    'date',
    'action',
  ];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Reclamation>();
  public PendigSourceState = new MatTableDataSource<Reclamation>();

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamationsPending();
    this.getReclamationsInprogress();
  }

  getReclamationsPending() {
    this.reclamationService.getReclamationsPending().subscribe((res) => {
      console.log(res);
      this.reclamations = res;
    });
  }

  getReclamationsInprogress() {
    this.reclamationService.getReclamationsInprogress().subscribe((res) => {
      console.log(res);
      this.PendigSourceState.data = res;
    });
  }
}
