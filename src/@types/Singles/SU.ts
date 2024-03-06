import { Semestre } from "./Semestre";
import { Ue } from "./ue";

export interface SU {
  id: number;
  uuid: string;
  semestre_id: number;
  ue_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  semestre: Semestre;
  ue: Ue;
}
