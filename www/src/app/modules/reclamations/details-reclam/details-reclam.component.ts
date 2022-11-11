import { Fournisseur } from './../../../entity/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from '../../../services/reclamation.service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-details-reclam',
  templateUrl: './details-reclam.component.html',
  styleUrls: ['./details-reclam.component.scss'],
})
export class DetailsReclamComponent implements OnInit {
  reclamation: any;
  fournisseurs: any;
  selectedValue: any = '';

  constructor(
    public reclamationService: ReclamationService,
    public fournisseurService: FournisseurService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReclamationByID(this.route.snapshot.params.id);
    this.getFournisseurs();
  }
  getFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe((res) => {
      console.log('fournisseur', res);
      this.fournisseurs = res;
    });
  }
  getReclamationByID(id: string): any {
    this.reclamationService.getReclamationByID(id).subscribe((res) => {
      console.log('GETRECLAM', res);
      this.reclamation = res;
    });
  }
  updateReclamation() {
    let id = this.route.snapshot.params.id;
    this.reclamationService
      .updateReclamation(id, this.selectedValue)
      .subscribe((res) => {
        console.log(res);
      });
    setTimeout(() => {
      this.router.navigateByUrl('/reclamations');
    }, 2000);
  }
}
