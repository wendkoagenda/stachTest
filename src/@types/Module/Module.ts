import { Dcnf } from "../Singles/Dcnf";
import { SuM } from "../Singles/SuM";
import { TeacherRoot } from "../Teacher/Teacher";

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
export interface ModuleShowModel {
  access_token: string;
  moduleUuid: string;
}
export interface ModuleShowResponse {
  success: boolean;
  message: string;
  data: ModuleDaum;
}
// Update Types
export interface ModuleUpdateModel {
  moduleUuid: string;
  updateModule: {
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

export interface ModuleShowByDCNFModel {
  access_token: string;
  dcnf_uuid: string | undefined;
}
export interface DCNFSUMShowResponse {
  success: boolean;
  message: string;
  data: DCNFSUMShowResponseDaum;
}
export interface DCNFSUMShowResponseDaum {
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

export interface DCNFSUMShowModel {
  access_token: string;
  dcnfsum_uuid: string | undefined;
}
export interface ModuleShowByDCNFResponse {
  success: boolean;
  message: string;
  data: ModuleShowByDCNFResponseDaum[];
}
export interface ModuleShowByDCNFResponseDaum {
  id: number;
  uuid: string;
  dcnf_id: number;
  su_m_id: number;
  statut: string;
  updated_by?: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnf: Dcnf;
  su_m: SuM;
}
export interface DCNF_SUMDeletionModel {
  access_token: string;
  dcnf_sum_id: number;
}

export interface DCNF_SUMCreationModel {
  access_token: string;
  newDcnfSum: {
    dcnf_id: number;
    su_m_id: number;
  };
}
export interface AssigneModel {
  access_token: string;
  newAssigne: {
    dcnfsum_id?: number | undefined;
    t_id: number;
    camp_year_id: number;
    allow_student_entry: boolean;
  };
}

export interface StudentAllowUpdateModel {
  dcnfsum_id: number | undefined;
  access_token: string;
}
export interface ModuleTeacherModel {
  dcnfsum_id: number | undefined;
  access_token: string;
}
