import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Reclamation } from 'src/app/interface/Reclamation';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation-detail',
  templateUrl: './reclamation-detail.page.html',
  styleUrls: ['./reclamation-detail.page.scss'],
  standalone: false,
})
export class ReclamationDetailPage implements OnInit {
  reclamation: Reclamation | null = null;
  role: string = '';
  note = '';
  focused: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.role = localStorage.getItem('role') as string;

    if (id) {
      this.loadReclamation(id);
    }
  }

  onBlur(event: any) {
    const value = event.target.value;
    if (!value) {
      this.focused = false;
    }
  }

  async loadReclamation(id: string) {
    this.reclamationService.getReclamation(id).subscribe({
      next: (data) => {
        this.reclamation = { ...data };

        if (this.reclamation!.imageURL) {
          if (!this.reclamation!.imageURL.startsWith('data:image')) {
            this.reclamation!.imageURL = `data:image/png;base64,${
              this.reclamation!.imageURL
            }`;
          }
        }

        switch (this.reclamation!.etat) {
          case 'Done':
            return 'Traiter';
          case 'Pending':
            return (this.reclamation!.etat = 'En attente');
          case 'InProgress':
            return (this.reclamation!.etat = 'En cours de traitement');
          case 'Verified':
            return (this.reclamation!.etat = 'En cours de verification');
          default:
            return (this.reclamation!.etat = 'Abandonner');
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

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }

  async onSubmit() {
    try {
      const res = await this.reclamationService
        .updateReclamationByFournisseur({
          id: this.route.snapshot.paramMap.get('id'),
          etat: 'Done',
          noteFournisseur: this.note,
        })
        .toPromise();
      const toast = await this.toastController.create({
        message: 'Réclamation a été modifier avec succès',
        duration: 2000,
        position: 'bottom',
        color: 'success',
      });
      toast.present();
      this.router.navigate([`/reclamation-detail/${res._id}`]); // Adjust the route as needed
    } catch (error) {
      this.showToast("Erreur lors de l'ajout de la réclamation");
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
