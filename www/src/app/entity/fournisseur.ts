import { Municipalite } from './municipalite';
import { Reclamation } from './reclamation';
export interface Fournisseur {
  _id: string;
  slug: string;
  email: string;
  addresse: string;
  description: string;
  telephone: string;
  password: string;
  listeReclamation: [Reclamation];
  categorie: string;
  active: boolean;
  municipalite: Municipalite;
}
