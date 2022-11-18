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
  displayedColumns = ['_id', 'citoyen', 'categorie', 'etat', 'date', 'action'];
  dataSource = new MatTableDataSource<Reclamation>();
  reclamation: any;
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
      console.log(res);
      this.dataSource.data = res;
      this.reclamation = res[0].fournisseur.slug;
    });
  }

  desactiveForunisseur(id: string, active: boolean) {
    let state = active ? false : true;
    this.fournisseurService.desactiveFournisseur(id, state).subscribe((res) => {
      console.log('desactive', res);
      this.desactive = res;
      setTimeout(() => {
        this.router.navigateByUrl('/details-fournisseur/' + id);
      }, 2000);
    });
  }
}
