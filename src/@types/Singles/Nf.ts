import { Filiere } from "./Filiere";
import { Niveau } from "./Niveau";

export interface Nf {
  id: number;
  uuid: string;
  niveau_id: number;
  filiere_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  niveau: Niveau;
  filiere: Filiere;
}
