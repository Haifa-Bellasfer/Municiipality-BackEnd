import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ReclamationService } from 'src/app/service/reclamation.service';
interface ListItem {
  id: string;
  name: string;
  status: 'InProgress' | 'Pending' | 'Done';
}
@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.page.html',
  styleUrls: ['./list-reclamation.page.scss'],
})
export class ListReclamationPage implements OnInit {
  constructor(private reclamationService: ReclamationService) {}
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
        status: item.etat,
      })
    );
    console.log(this.items);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'Done':
        return 'success';
      case 'Pending':
        return 'medium';
      case 'InProgress':
        return 'medium';
      case 'Verified':
        return 'warning';
      default:
        return 'danger';
    }
  }

  onItemClick(item: ListItem) {
    console.log('Clicked item:', item);
  }
}
