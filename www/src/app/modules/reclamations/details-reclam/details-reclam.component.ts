import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from '../reclamation.service';

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
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Fournisseur 1' },
    { value: 'pizza-1', viewValue: 'Fournisseur 2' },
    { value: 'tacos-2', viewValue: 'Fournisseur 3' },
  ];

  reclamationState: Reclamation | undefined;

  constructor(
    public reclamationService: ReclamationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getReclamationByID();
  }

  getReclamationByID() {
    let id = this.route.snapshot.params.id;

    this.reclamationService.getReclamationByID(id).subscribe((res) => {
      console.log(res);
      this.reclamationState = res;
    });
  }

  updateReclamation() {
    let id = this.route.snapshot.params.id;
    this.reclamationService.updateReclamation(id).subscribe();
    this.router.navigateByUrl('/reclamations');
  }
}
