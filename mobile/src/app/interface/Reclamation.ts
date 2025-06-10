import { Municipalite } from './../../../../www/src/app/entity/municipalite';
export interface Reclamation {
  description: string;
  adresse: string;
  categorie: string;
  imageURL: string;
  citoyen: string;
  etat: string;
  noteResponsable?: string;
  noteFournisseur?: string;
  Municipalite: Municipalite | string;
}
