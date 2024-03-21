import { Dc } from "./Dc";
import { Nf } from "./Nf";

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

export interface DCNFRoot {
  success: boolean;
  message: string;
  data: Dcnf[];
}
