export interface Citoyen {
  _id?: string;
  username: string;
  nom: string;
  prenom: string;
  email: string;
  sexe?: 'Homme' | 'Femme';
  password: string;
  adresse: string;
  telephone: string;
  createdAt?: string;
  updatedAt?: string;
}
