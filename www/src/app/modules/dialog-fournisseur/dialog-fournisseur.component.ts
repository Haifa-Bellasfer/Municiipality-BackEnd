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
  fournisseur: Fournisseur[] = [];

  constructor(
    public fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {}
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
  ajoutFournisseur(): any {
    console.log(
      this.slug,
      this.email,
      this.password,
      this.categorie,
      this.addresse,
      this.phone
    );
    this.fournisseurService
      .addFournisseur(
        this.slug,
        this.email,
        this.password,
        this.categorie,
        this.addresse,
        this.phone
      )
      .subscribe((res) => {
        console.log('add fournisseur', res);
        this.fournisseur = res;
      });
    window.location.reload();
  }
}
