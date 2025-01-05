import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/service/reclamation.service';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.page.html',
  styleUrls: ['./reclamation-detail.page.scss'],
})
export class ReclamationDetailPage implements OnInit {
  reclamation: any;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadReclamation(id);
    }
  }

  async loadReclamation(id: string) {
    this.reclamationService.getReclamation(id).subscribe({
      next: (data) => {
        this.reclamation = data;
      },
      error: (error) => {
        console.error('Error fetching reclamation:', error);
      },
    });
  }
}
