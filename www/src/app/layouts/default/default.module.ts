import { ArchiveComponent } from './../../modules/archive/archive.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { reclamationsComponent } from 'src/app/modules/reclamations/reclamations.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { DetailsReclamComponent } from 'src/app/modules/reclamations/details-reclam/details-reclam.component';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { FournisseurComponent } from 'src/app/modules/fournisseur/fournisseur.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DetailsFournisseurComponent } from 'src/app/modules/fournisseur/details-fournisseur/details-fournisseur.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    reclamationsComponent,
    DetailsReclamComponent,
    FournisseurComponent,
    DetailsFournisseurComponent,
    ArchiveComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatTabsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
  ],
})
export class DefaultModule {}
