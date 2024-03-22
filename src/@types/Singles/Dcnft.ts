import { TeacherDaum } from "../Teacher/Teacher";
import { Dc } from "./Dc";
import { Nf } from "./Nf";

export interface DcnftResponse {
  success: boolean;
  message: string;
  data: Dcnft[];
}
export interface Dcnft {
  id: number;
  uuid: string;
  dcnf_id: number;
  t_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnf: Dcnf;
  t: TeacherDaum;
}

export interface Dcnf {
  id: number;
  uuid: string;
  dc_id: number;
  nf_id: number;
  camp_year_id: number;
  dc: Dc;
  nf: Nf;
}
