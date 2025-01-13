import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';
interface ListItem {
  id: string;
  name: string;
  status: string;
}
@Component({
  selector: 'app-list-reclamation',
  templateUrl: 'list-reclamation.page.html',
  styleUrls: ['list-reclamation.page.scss'],
  standalone: false,
})
export class ListReclamationPage {
  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private router: Router
  ) {}
  list: any;
  items: ListItem[] = [];

  async ngOnInit() {
    const id = localStorage.getItem('userId');

    try {
      this.list = await firstValueFrom(
        this.reclamationService.getMyReclamations(id!)
      );
      console.log('Data loaded:', this.list);
    } catch (error) {
      console.error('Error:', error);
    }

    this.list.map((item: any) =>
      this.items.push({
        id: item._id,
        name: item.categorie as string,
        status: this.getStatusName(item.etat),
      })
    );
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Traiter':
        return 'success';
      case 'En attente':
        return 'medium';
      case 'En cours de traitement':
        return 'medium';
      case 'En cours de verification':
        return 'warning';
      default:
        return 'danger';
    }
  }

  getStatusName(status: string): string {
    switch (status) {
      case 'Done':
        return 'Traiter';
      case 'Pending':
        return 'En attente';
      case 'InProgress':
        return 'En cours de traitement';
      case 'Verified':
        return 'En cours de verification';
      default:
        return 'Abandonner';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
