import { Cycle } from "../Singles/Cycle";
import { Departement } from "../Singles/Departement";

export interface DepartementRoot {
  success: boolean;
  message: string;
  data: DepartementDaum[];
}

export interface DepartementDaum {
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

// Show
export interface DepartementShowModel {
  access_token: string;
  dc_uuid: string | undefined;
}

export interface DepartementShowResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
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
