import { Component, OnInit, Inject } from '@angular/core';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from './reclamation.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-posts',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class reclamationsComponent implements OnInit {
  student: Reclamation[] = [];
  // columns we will show on the table
  public displayedColumns = ['_id', 'categorie', 'location', 'etat', 'email'];
  //the source where we will get the data
  public dataSource = new MatTableDataSource<Reclamation>();

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamationAll();
  }
  getReclamationAll() {
    //let reclam: PeriodicElement;
    this.reclamationService.getReclamations().subscribe((res) => {
      console.log(res);
      this.dataSource.data = res;
    });
  }
}
