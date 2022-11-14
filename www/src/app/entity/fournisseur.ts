import { Reclamation } from './reclamation';
export interface Fournisseur {
  _id: string;
  slug: string;
  email: string;
  addresse: string;
  phone: string;
  password: string;
  listeReclamation: [Reclamation];
  categorie: string;
  active: boolean;
}
