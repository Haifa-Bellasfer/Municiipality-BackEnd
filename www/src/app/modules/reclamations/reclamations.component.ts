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
  student: Reclamation[] = [];
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
    this.getReclamationAll();
    this.getReclamationsByState();
  }

  getReclamationAll() {
    this.reclamationService.getReclamations().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }

  getReclamationsByState() {
    this.reclamationService.getReclamationsByState().subscribe((res) => {
      console.log(res);
      this.PendigSourceState.data = res;
    });
  }
}
