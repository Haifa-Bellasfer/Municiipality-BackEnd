import { Component, OnInit } from '@angular/core';
import { MunicipaliteService } from 'src/app/services/municipalite.service';
import { ResponsableService } from 'src/app/services/responsable.service';

@Component({
  selector: 'app-dialog-responsable',
  templateUrl: './dialog-responsable.component.html',
  styleUrls: ['./dialog-responsable.component.scss'],
})
export class DialogResponsableComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  email: string = '';
  sexe: string = '';
  adresse: string = '';
  telephone: string = '';
  matricule: string = '';
  password: string = '';
  selectedMunicipalite: string = '';
  municipalites: any[] = [
    { _id: '1', region: 'Tunis' },
    { _id: '2', region: 'Ariana' },
    { _id: '3', region: 'Ben Arous' },
  ];

  constructor(
    private municipaliteService: MunicipaliteService,
    private responsableService: ResponsableService
  ) {}

  ngOnInit(): void {
    this.loadMunicipalites();
  }
  loadMunicipalites() {
    this.municipaliteService.getMunicipalites().subscribe((data: any[]) => {
      this.municipalites = data;
      if (data.length > 0) {
        this.selectedMunicipalite = data[0]._id; // Set default to first
      }
    });
  }
  getNom(event: Event) {
    const input = event.target as HTMLInputElement;
    this.nom = input.value;
  }

  getPrenom(event: Event) {
    const input = event.target as HTMLInputElement;
    this.prenom = input.value;
  }

  getEmail(event: Event) {
    const input = event.target as HTMLInputElement;
    this.email = input.value;
  }

  getSexe(event: any) {
    this.sexe = event.value;
  }

  getAdresse(event: Event) {
    const input = event.target as HTMLInputElement;
    this.adresse = input.value;
  }

  getPhone(event: Event) {
    const input = event.target as HTMLInputElement;
    this.telephone = input.value;
  }

  getMatricule(event: Event) {
    const input = event.target as HTMLInputElement;
    this.matricule = input.value;
  }

  getPassword(event: Event) {
    const input = event.target as HTMLInputElement;
    this.password = input.value;
  }

  ajoutResponsable() {
    const responsable = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      sexe: this.sexe,
      adresse: this.adresse,
      telephone: this.telephone,
      matricule: this.matricule,
      password: this.password,
      municipalite: this.selectedMunicipalite,
    };
    console.log('Responsable à ajouter:', responsable);
    this.responsableService
      .addResponsable(
        this.matricule,
        this.nom,
        this.prenom,
        this.email,
        this.sexe,
        this.adresse,
        this.telephone,
        this.password,
        this.selectedMunicipalite
      )
      .subscribe((res) => {
        console.log('Responsable ajouté:', res);
      });
  }
}
