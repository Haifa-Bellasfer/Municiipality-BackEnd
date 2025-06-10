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
  PendingReclamations: Reclamation[] = [];
  InprogressReclamations: Reclamation[] = [];
  DoneReclamations: Reclamation[] = [];
  activeTabIndex: number = 0;

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamationsPending();
    this.getReclamationsInprogress();
    this.getReclamationsDone();
  }

  getReclamationsPending() {
    const municipalityId = localStorage.getItem('municipalityId');
    this.reclamationService
      .getReclamationsByStatus(
        'Pending',
        municipalityId ? municipalityId : undefined
      )
      .subscribe((res) => {
        console.log('pending', res);
        this.PendingReclamations = res;
      });
  }

  getReclamationsInprogress() {
    const municipalityId = localStorage.getItem('municipalityId');
    this.reclamationService
      .getReclamationsByStatus(
        'InProgress',
        municipalityId ? municipalityId : undefined
      )
      .subscribe((res) => {
        this.InprogressReclamations = res;
      });
  }

  getReclamationsDone() {
    const municipalityId = localStorage.getItem('municipalityId');
    this.reclamationService
      .getReclamationsByStatus(
        'Done',
        municipalityId ? municipalityId : undefined
      )
      .subscribe((res) => {
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
