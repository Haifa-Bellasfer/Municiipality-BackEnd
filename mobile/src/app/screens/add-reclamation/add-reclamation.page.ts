import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Reclamation } from 'src/app/interface/Reclamation';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: 'add-reclamation.page.html',
  styleUrls: ['add-reclamation.page.scss'],
  standalone: false,
})
export class AddReclamationPage implements OnInit {
  imagePreview: string | undefined;
  selectedFile: string | ArrayBuffer | null = null;
  categories: { key: number; value: string }[] = [
    { key: 1, value: 'Eclairage' },
    { key: 2, value: 'Nettoyage' },
    { key: 3, value: 'Batiment' },
    { key: 4, value: 'Autre' },
  ];
  formData: Reclamation = {
    description: '',
    adresse: '',
    categorie: '',
    myImage: '',
    citoyen: '',
  };

  focused: boolean = true;

  constructor(
    private reclamationService: ReclamationService,
    private toastController: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  onBlur(event: any) {
    const value = event.target.value;
    if (!value) {
      this.focused = false;
    }
  }

  onChangee(event: any) {
    this.formData.categorie = event.detail.value;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      // Validate file size (e.g., max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showToast('La taille du fichier ne doit pas dépasser 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.showToast('Veuillez sélectionner une image');
        return;
      }

      const reader = new FileReader();
      reader.onerror = () => {
        this.showToast('Erreur lors de la lecture du fichier');
      };

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result;
          this.formData.myImage = base64String;
          this.selectedFile = base64String;
        }
      };

      reader.readAsDataURL(file);
    }
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

  async onSubmit(form: NgForm) {
    if (form.valid) {
      const citoyen = localStorage.getItem('userId');
      this.formData.citoyen = citoyen as string;

      try {
        const res = await this.reclamationService
          .addReclamation({ ...this.formData })
          .toPromise();
        const toast = await this.toastController.create({
          message: 'Réclamation ajoutée avec succès',
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        toast.present();

        // Redirect or reset form after successful submission
        this.router.navigate(['/tabs/tab1']); // Adjust the route as needed
      } catch (error) {
        this.showToast("Erreur lors de l'ajout de la réclamation");
      }
    } else {
      this.showToast(
        'Veuillez remplir tous les champs obligatoires correctement'
      );
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
