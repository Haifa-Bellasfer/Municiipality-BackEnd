import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  PendingCount: number = 0;
  InProgressCount: number = 0;
  DoneCount: number = 0;

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.countReclamations();
  }

  countReclamations() {
    this.reclamationService
      .countReclamationsByStatus('Pending')
      .subscribe((res) => {
        console.log(res);
        this.PendingCount = res.numberOfReclamations;
      });
    this.reclamationService
      .countReclamationsByStatus('InProgress')
      .subscribe((res) => {
        console.log(res);
        this.InProgressCount = res.numberOfReclamations;
      });
    this.reclamationService
      .countReclamationsByStatus('Done')
      .subscribe((res) => {
        console.log(res);
        this.DoneCount = res.numberOfReclamations;
      });
  }
}
