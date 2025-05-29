export interface Responsable {
  _id: string;
  nom: string;
  prenom: string;
  email: string;
  sexe: string;
  adresse: string;
  telephone: string;
  matricule: string;
  password: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}
