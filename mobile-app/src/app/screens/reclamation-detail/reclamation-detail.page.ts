import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/service/reclamation.service';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.page.html',
  styleUrls: ['./reclamation-detail.page.scss'],
})
export class ReclamationDetailPage implements OnInit {
  reclamation: any = null;

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
        // Log the raw data
        console.log('Raw data:', data);

        this.reclamation = { ...data };

        // Process image URL if it exists
        if (this.reclamation.imageURL) {
          if (!this.reclamation.imageURL.startsWith('data:image')) {
            this.reclamation.imageURL = `data:image/png;base64,${this.reclamation.imageURL}`;
          }
          // Log the processed image URL
          console.log(
            'Processed image URL:',
            this.reclamation.imageURL.substring(0, 100) + '...'
          );
        }
      },
      error: (error) => {
        console.error('Error fetching reclamation:', error);
      },
    });
  }

  onImageError(event: any) {
    console.error('Image failed to load', {
      src: event.target.src?.substring(0, 100) + '...',
      error: event,
    });
  }

  getStatusColor(status: string): string {
    // Your existing status color logic
    return 'primary';
  }
}
