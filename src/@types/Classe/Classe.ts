import { Dc } from "../Singles/Dc";
import { Filiere } from "../Singles/Filiere";
import { Nf } from "../Singles/Nf";
import { Niveau } from "../Singles/Niveau";

export interface ClasseRoot {
  success: boolean;
  message: string;
  data: ClasseDaum[];
}
export interface ClasseDaum {
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
// Show
export interface ClasseShowResponse {
  success: boolean;
  message: string;
  data: Data;
}
export interface Data {
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
// lIste by DC
export interface ClasseShowByDCRoot {
  success: boolean;
  message: string;
  data: ClasseShowByDC[];
}
export interface ClasseShowByDC {
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

//
export interface ClasseShowByDCModel {
  access_token: string;
  dc_uuid: string | undefined;
}

export interface ClasseShowModel {
  access_token: string;
  dcnf_uuid: string | undefined;
}
