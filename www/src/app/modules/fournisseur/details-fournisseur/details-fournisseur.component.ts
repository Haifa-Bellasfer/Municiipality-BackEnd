import { Fournisseur } from './../../../entity/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Reclamation } from './../../../entity/reclamation';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationService } from './../../../services/reclamation.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-details-fournisseur',
  templateUrl: './details-fournisseur.component.html',
  styleUrls: ['./details-fournisseur.component.scss'],
})
export class DetailsFournisseurComponent implements OnInit {
  dataSource = new MatTableDataSource<Reclamation>();
  reclamations: Reclamation[] = [];
  fournisseur: Fournisseur | null = null;
  displayedColumns: string[] = ['username', 'etat'];

  desactive: any;

  constructor(
    public reclamationService: ReclamationService,
    public route: ActivatedRoute,
    public fournisseurService: FournisseurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReclamationFournisseur(this.route.snapshot.params.id);
  }

  getReclamationFournisseur(id: string) {
    this.reclamationService.getReclamationFournisseur(id).subscribe((res) => {
      this.reclamations = res;
      this.fournisseur = this.reclamations[0].fournisseur;
    });
  }

  desactiveForunisseur() {
    let state = !this.fournisseur?.active;
    const fournisseurId = this.fournisseur?._id;
    if (fournisseurId) {
      this.fournisseurService
        .desactiveFournisseur(fournisseurId, state)
        .subscribe((res) => {
          console.log('desactive', res);
          this.desactive = res;
          setTimeout(() => {
            // Refresh the page
            window.location.reload();
          }, 2000);
        });
    } else {
      console.error('Fournisseur ID is undefined.');
    }
  }
}
