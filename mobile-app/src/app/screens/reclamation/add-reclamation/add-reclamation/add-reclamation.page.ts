import { Component, OnInit } from '@angular/core';
import { Reclamation } from 'src/app/interface/reclamation';
import { ReclamationService } from 'src/app/service/reclamation.service';
@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.page.html',
  styleUrls: ['./add-reclamation.page.scss'],
})
export class AddReclamationPage implements OnInit {
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

  imagePreview: string | undefined;

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    const formData = new FormData();
    formData.append('myImage', file);

    try {
      const response = this.reclamationService
        .uploadImage(formData)
        .subscribe((res) => {
          this.formData.myImage = res.name as any;
          console.log(res);
        });

      console.log('File uploaded successfully', response);
    } catch (error) {
      console.error('Error uploading file', error);
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
