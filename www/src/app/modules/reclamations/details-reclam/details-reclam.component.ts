import { Component, OnInit } from '@angular/core';
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

  reclamation: Reclamation[] = [];

  constructor(public reclamationService: ReclamationService) {}

  ngOnInit(): void {
    this.getReclamationAll();
  }
  getReclamationAll() {
    //let reclam: PeriodicElement;
    this.reclamationService.getReclamations().subscribe((res) => {
      this.reclamation = res;
      console.log(this.reclamation);
    });
  }
}
