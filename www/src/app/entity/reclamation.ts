export interface Reclamation {
  _id: string;
  categorie: string;
  localisation: string;
  etat: string;
  imageURL: string;
  description: string;
  date: Date;
  fournisseur: {
    slug: string;
  };
}
