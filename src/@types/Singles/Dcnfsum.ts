import { Dc } from "./Dc";
import { Nf } from "./Nf";
import { SuM } from "./SuM";

export interface Dcnfsum {
  id: number;
  uuid: string;
  dcnf_id: number;
  su_m_id: number;
  statut: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnf: Dcnf;
  su_m: SuM;
}

export interface Dcnf {
  id: number;
  uuid: string;
  dc_id: number;
  nf_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dc: Dc;
  nf: Nf;
}
