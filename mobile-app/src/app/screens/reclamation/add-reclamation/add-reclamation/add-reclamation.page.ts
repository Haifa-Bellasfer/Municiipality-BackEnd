import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/interface/reclamation';
import { ReclamationService } from 'src/app/service/reclamation.service';
@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.page.html',
  styleUrls: ['./add-reclamation.page.scss'],
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

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  constructor(private reclamationService: ReclamationService) {}

  ngOnInit() {}
  onChangee(event: any) {
    this.formData.categorie = event.target.value;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onerror = () => {
        console.error('Error reading file');
      };

      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const base64String = reader.result;
          this.formData.myImage = base64String;
        }
      };

      reader.readAsDataURL(file);
    }
  }
  addReclamation() {
    const citoyen = localStorage.getItem('userId');
    this.formData.citoyen = citoyen as string;
    this.reclamationService
      .addReclamation({ ...this.formData })
      .subscribe((res) => {
        console.log('reclamation :', res);
      });
  }
}
