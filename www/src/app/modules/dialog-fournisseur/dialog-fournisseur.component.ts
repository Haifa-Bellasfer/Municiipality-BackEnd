import { MunicipaliteService } from 'src/app/services/municipalite.service';
import { Fournisseur } from './../../entity/fournisseur';
import { FournisseurService } from './../../services/fournisseur.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-fournisseur',
  templateUrl: './dialog-fournisseur.component.html',
  styleUrls: ['./dialog-fournisseur.component.scss'],
})
export class DialogFournisseurComponent implements OnInit {
  slug: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  addresse: string = '';
  categorie: string = '';
  categorieAutre: string = '';
  description: string = '';
  fournisseur: Fournisseur | null = null;
  municipalites: any[] = [];
  selectedMunicipalite: string = '';

  constructor(
    public fournisseurService: FournisseurService,
    private municipaliteService: MunicipaliteService
  ) {}

  ngOnInit(): void {
    this.loadMunicipalites();
  }
  getSlug(event: any) {
    this.slug = event.target.value;
  }
  getEmail(event: any) {
    this.email = event.target.value;
  }
  getPassword(event: any) {
    this.password = event.target.value;
  }
  getAdresse(event: any) {
    this.addresse = event.target.value;
  }
  getPhone(event: any) {
    this.phone = event.target.value;
  }
  getCategorie(event: any) {
    this.categorie = event.target.value;
    console.log(event.target.value);
  }
  getCategorieAutre(event: Event) {
    const input = event.target as HTMLInputElement;
    this.categorieAutre = input.value;
  }
  getDescription(event: Event) {
    const input = event.target as HTMLTextAreaElement;
    this.description = input.value;
  }
  ajoutFournisseur(): any {
    this.fournisseurService
      .addFournisseur(
        this.slug,
        this.email,
        this.password,
        this.categorie,
        this.addresse,
        this.phone,
        this.selectedMunicipalite,
        this.description
      )
      .subscribe((res) => {
        console.log('add fournisseur', res);
        this.fournisseur = res;
      });
    window.location.reload();
  }
  loadMunicipalites() {
    this.municipaliteService.getMunicipalites().subscribe((data: any[]) => {
      this.municipalites = data;
      if (data.length > 0) {
        this.selectedMunicipalite = data[0]._id; // Set default to first
      }
    });
  }
}
