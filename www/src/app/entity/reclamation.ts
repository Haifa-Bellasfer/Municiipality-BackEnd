import { Fournisseur } from './fournisseur';
import { Responsable } from './responsable';

export interface Reclamation {
  _id: string;
  categorie: string;
  localisation: string;
  etat: string;
  imageURL: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  fournisseur: Fournisseur | null;
  citoyen: Responsable | null;
  municipality: string | null;
  noteResponsable: string;
}
