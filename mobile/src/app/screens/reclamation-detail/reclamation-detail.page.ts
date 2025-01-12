import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.page.html',
  styleUrls: ['./reclamation-detail.page.scss'],
  standalone: false,
})
export class ReclamationDetailPage implements OnInit {
  reclamation: any = null;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private router: Router
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
        this.reclamation = { ...data };

        if (this.reclamation.imageURL) {
          if (!this.reclamation.imageURL.startsWith('data:image')) {
            this.reclamation.imageURL = `data:image/png;base64,${this.reclamation.imageURL}`;
          }
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
    return 'primary';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
