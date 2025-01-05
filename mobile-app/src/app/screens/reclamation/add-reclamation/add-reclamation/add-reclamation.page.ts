import { Component, OnInit } from '@angular/core';
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
  formData = {
    description: '',
    localisation: '',
    categorie: '',
    myImage: '',
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
    console.log(event.target.value);
    this.formData.categorie = event.target.value;
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    console.log(event);

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFile = e.target?.result as any;
      };
      this.reclamationService
        .uploadImage(event.target.files)
        .subscribe((res) => {
          console.log(res);
        });
      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  uploadFile() {
    // Implement the logic to upload the selected file to your backend
    if (this.selectedFile) {
      // Perform the upload operation (e.g., using HttpClient)
      console.log('Uploading file:', this.selectedFile);
      this.reclamationService
        .uploadImage(this.selectedFile)
        .subscribe((res) => {
          console.log(res);
        });
      // Add your upload logic here
    } else {
      console.warn('No file selected.');
    }
  }
  addReclamation() {
    console.log('reclamaation in form', this.formData);
    this.reclamationService
      .addReclamation({ ...this.formData })
      .subscribe((res) => {
        console.log('reclamation :', res);
      });
  }
}
