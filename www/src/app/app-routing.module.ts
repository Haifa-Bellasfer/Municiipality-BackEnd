import { DetailsFournisseurComponent } from './modules/fournisseur/details-fournisseur/details-fournisseur.component';
import { ArchiveComponent } from './modules/archive/archive.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentification/login/login.component';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { FournisseurComponent } from './modules/fournisseur/fournisseur.component';
import { DetailsReclamComponent } from './modules/reclamations/details-reclam/details-reclam.component';
import { reclamationsComponent } from './modules/reclamations/reclamations.component';
import { ResponsableComponent } from './modules/responsable/responsable.component';
import { MunicipalityComponent } from './modules/municipality/municipality.component';
import { MunicipalityDetailsComponent } from './modules/municipality/municipality-details/municipality-details.component';

export const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'reclamations',
        component: reclamationsComponent,
      },
      {
        path: 'details/:id',
        component: DetailsReclamComponent,
      },
      {
        path: 'fournisseur',
        component: FournisseurComponent,
      },
      {
        path: 'municipality',
        component: MunicipalityComponent,
      },
      {
        path: 'responsable',
        component: ResponsableComponent,
      },
      {
        path: 'details-fournisseur/:id',
        component: DetailsFournisseurComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'municipality-details/:id',
        component: MunicipalityDetailsComponent,
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
