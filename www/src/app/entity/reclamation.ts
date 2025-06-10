import { Citoyen } from './citoyen';
import { Fournisseur } from './fournisseur';

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
  citoyen: Citoyen | null;
  municipality: string | null;
  noteResponsable: string;
}
