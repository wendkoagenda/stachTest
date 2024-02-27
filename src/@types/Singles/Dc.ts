import { Cycle } from "./Cycle";
import { Departement } from "./Departement";

export interface Dc {
  id: number;
  uuid: string;
  departement_id: number;
  cycle_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  departement: Departement;
  cycle: Cycle;
}
