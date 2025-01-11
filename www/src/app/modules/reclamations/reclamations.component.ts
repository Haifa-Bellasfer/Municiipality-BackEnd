import { Component, OnInit, Inject } from '@angular/core';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from '../../services/reclamation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-posts',
  templateUrl: './reclamations.component.html',
  styleUrls: ['./reclamations.component.scss'],
})
export class reclamationsComponent implements OnInit {
  PendingReclamations: any;
  InprogressReclamations: any;
  DoneReclamations: any;
  activeTabIndex: number = 0; // Default active tab index

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamationsPending();
    this.getReclamationsInprogress();
    this.getReclamationsDone();
  }

  getReclamationsPending() {
    this.reclamationService
      .getReclamationsByStatus('Pending')
      .subscribe((res) => {
        console.log('pending', res);
        this.PendingReclamations = res;
      });
  }

  getReclamationsInprogress() {
    this.reclamationService
      .getReclamationsByStatus('InProgress')
      .subscribe((res) => {
        console.log('progress', res);
        this.InprogressReclamations = res;
      });
  }
  getReclamationsDone() {
    this.reclamationService.getReclamationsByStatus('Done').subscribe((res) => {
      console.log('done', res);
      this.DoneReclamations = res;
    });
  }

  // Triggered when the tab changes
  onTabChange(event: any): void {
    console.log('Tab changed to index:', event.index);
  }

  // Triggered when the active tab is clicked
  onActiveTabClick(tabIndex: number): void {
    if (tabIndex === this.activeTabIndex) {
      console.log('Active tab clicked:', tabIndex);
      // Additional logic for active tab click
    }
  }
}
