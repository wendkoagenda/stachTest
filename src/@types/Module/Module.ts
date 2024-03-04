// Root Types
export interface ModuleRoot {
  success: boolean;
  message: string;
  data: ModuleDaum[];
}
export interface ModuleDaum {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  acronym: string;
  code: string;
  vh_cm: number;
  vh_td: number;
  vh_tp: number;
  credits: number;
  coef: number;
  description: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}
// Creation Types
export interface ModuleCreationModel {
  newModule: {
    title: string;
    acronym: string;
    code: string;
    vh_cm: number;
    vh_td: number;
    vh_tp: number;
    credits: number;
    coef: number;
    description: string;
    camp_year_id: number;
  };
  access_token: string;
}
// Delete Types
export interface ModuleDeletionModel {
  access_token: string;
  moduleId: number;
}
// Show Types
export interface ModuleShowModel {}
export interface ModuleShowResponse {
  success: boolean;
  message: string;
  data: ModuleDaum;
}
// Update Types
export interface ModuleUpdateModel {}
