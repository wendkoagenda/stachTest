import { StudentDaum } from "../Student/Student";
import { Dc } from "./Dc";
import { Nf } from "./Nf";

export interface DcnfsResponse {
  success: boolean;
  message: string;
  data: Dcnfs;
}
export interface Dcnfs {
  id: number;
  uuid: string;
  dcnf_id: number;
  t_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnf: Dcnf;
  t: StudentDaum;
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
