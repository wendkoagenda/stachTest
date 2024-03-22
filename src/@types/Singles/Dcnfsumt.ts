import { Teacher } from "../Teacher/Teacher";
import { Dcnfsum } from "./Dcnfsum";

export interface Dcnfsumt {
  id: number;
  uuid: string;
  dcnfsum_id: number;
  t_id: number;
  allow_student_entry: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnfsum: Dcnfsum;
  t: Teacher;
}

export interface DcnfsumtResponse {
  success: boolean;
  message: string;
  data: Dcnfsumt[];
}
export interface MyClassesShowByDCNFModel {
  dcnf_id: number;
  access_token: string;
}
