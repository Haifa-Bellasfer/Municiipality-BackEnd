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
  reclamation: Reclamation[] = [];
  // columns we will show on the table
  public displayedColumns = [
    '_id',
    'categorie',
    'location',
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
      this.dataSource.data = res;
    });
  }

  getReclamationsInprogress() {
    this.reclamationService.getReclamationsInprogress().subscribe((res) => {
      console.log(res);
      this.PendigSourceState.data = res;
    });
  }
}
