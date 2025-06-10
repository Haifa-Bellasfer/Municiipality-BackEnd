import { Fournisseur } from './fournisseur';
import { Reclamation } from './reclamation';
import { Responsable } from './responsable';

export interface Municipalite {
  _id: string;
  region: string;
  adresse: string;
  responsable: Responsable;
  reclamations: Reclamation[];
  fournisseurs: Fournisseur[];
}
