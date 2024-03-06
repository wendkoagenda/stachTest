import { ModuleDaum } from "../Module/Module";
import { SU } from "./SU";

export interface SuM {
  id: number;
  uuid: string;
  s_u_id: number;
  module_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  s_u: SU;
  module: ModuleDaum;
}
