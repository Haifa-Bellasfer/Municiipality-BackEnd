import { ArchiveService } from './../../../services/archive.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/entity/reclamation';
import { ReclamationService } from '../../../services/reclamation.service';
import { Archive } from 'src/app/entity/archive';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-details-reclam',
  templateUrl: './details-reclam.component.html',
  styleUrls: ['./details-reclam.component.scss'],
})
export class DetailsReclamComponent implements OnInit {
  reclamation: any;
  fournisseurs: any;
  selectedValue: any = '';
  archived: Archive[] = [];

  constructor(
    public reclamationService: ReclamationService,
    public fournisseurService: FournisseurService,
    public archiveService: ArchiveService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadReclamation(this.route.snapshot.params.id);
    this.getFournisseurs();
  }
  openDialog() {
    localStorage.setItem('idRecalmation', this.route.snapshot.params.id);
    this.dialog.open(DialogComponent);
  }
  getFournisseurs() {
    this.fournisseurService.getFournisseurs().subscribe((res) => {
      console.log('fournisseur', res);
      this.fournisseurs = res;
    });
  }

  loadReclamation(id: string) {
    this.reclamationService.getReclamationByID(id).subscribe({
      next: (data) => {
        this.reclamation = { ...data };

        if (this.reclamation.imageURL) {
          if (!this.reclamation.imageURL.startsWith('data:image')) {
            this.reclamation.imageURL = `data:image/png;base64,${this.reclamation.imageURL}`;
          }
        }
      },
      error: (error) => {
        console.error('Error fetching reclamation:', error);
      },
    });
  }
  onImageError(event: any) {
    console.error('Image failed to load', {
      src: event.target.src?.substring(0, 100) + '...',
      error: event,
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
  updateReclamationVerified() {
    let id = this.route.snapshot.params.id;
    this.reclamationService
      .updateReclamationVerified(id, this.selectedValue)
      .subscribe((res) => {
        console.log(res);
      });
    setTimeout(() => {
      this.router.navigateByUrl('/reclamations');
    }, 2000);
  }
}
