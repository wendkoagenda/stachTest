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

export interface Departement {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  acronym: string;
  description: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}

export interface Cycle {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  acronym: string;
  description: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}
