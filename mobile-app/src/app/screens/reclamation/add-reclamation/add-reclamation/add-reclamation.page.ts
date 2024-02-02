import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReclamationService } from 'src/app/service/reclamation.service';
import { RegistrationService } from 'src/app/service/registration.service';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.page.html',
  styleUrls: ['./add-reclamation.page.scss'],
})
export class AddReclamationPage implements OnInit {
  selectedFile: string | ArrayBuffer | null = null;
  formData = {
    username: '',
    email: '',
    password: '',
    addresse: '',
    phone: '',
    imageURL: '',
  };
  focused: boolean = true;

  onBlur(event: any) {
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  constructor(
    private registrationService: RegistrationService,
    private reclamationService: ReclamationService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('ddd');
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
  registrationSubmit() {
    console.log('ahawa login', this.formData);
    this.registrationService
      .SignUp({ ...this.formData, role: 'Citoyen' })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
