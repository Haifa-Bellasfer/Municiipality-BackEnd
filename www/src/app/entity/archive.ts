import { Reclamation } from './reclamation';
export interface Archive {
  _id: string;
  description: string;
  reclamations: Reclamation;
}
