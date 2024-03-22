import { Dcnfsum } from "../Singles/Dcnfsum";
import { Dcnfsumt } from "../Singles/Dcnfsumt";

// Root Types
export interface SeanceRoot {
  success: boolean;
  message: string;
  data: SeanceDaum[];
}
export interface SeanceDaum {
  id: number;
  uuid: string;
  dcnfsumt_id: number;
  title: string;
  slug: string;
  vh_cm_eff: number;
  vh_td_eff: number;
  vh_tp_eff: number;
  vh_cm_rest: number;
  vh_td_rest: number;
  vh_tp_rest: number;
  vh_cm_total_eff: number;
  vh_td_total_eff: number;
  vh_tp_total_eff: number;
  ex_vh_cm_eff: number;
  ex_vh_td_eff: number;
  ex_vh_tp_eff: number;
  ex_vh_cm_total_eff: number;
  ex_vh_td_total_eff: number;
  ex_vh_tp_total_eff: number;
  contenu: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  dcnfsumt: Dcnfsumt;
}
// Creation Types
export interface SeanceCreationModel {
  newSeance: {
    title: string;
    dcnf_sum_id: number;
    t_id: number;
    vh_cm_eff: number;
    vh_td_eff: number;
    vh_tp_eff: number;
    contenu: string;
    camp_year_id: number;
  };
  access_token: string;
}
// Delete Types
export interface SeanceDeletionModel {}
// Show Types
export interface SeanceShowModel {
  seanceUuid: string;
  access_token: string;
}
export interface SeancesShowByDCNFSUMModel {
  dcnfsum_id: number | undefined;
  access_token: string;
}

export interface SeancesShowByDCNFSUMResponse {
  success: boolean;
  message: string;
  data: Dcnfsumt;
}
// Update Types
export interface SeanceUpdateModel {
  updateSeance: {
    title: string;
    dcnfsumt_id: number;
    vh_cm_eff: number;
    vh_td_eff: number;
    vh_tp_eff: number;
    contenu: string;
    camp_year_id: number;
  };
  seanceUuid: string;
  access_token: string;
}

export interface GetQrSVGDataProps {
  width: number;
  height: number;
  viewBox: string;
  children: React.ReactNode; // Optional for potential child elements within the SVG
}
export interface GetQrSVGResponse {
  svgData: string; // Assuming the API response has an 'svgData' property containing the SVG string
}
export interface GetQrSVGModel {
  fileName: string | undefined;
  access_token: string;
}
export interface ApprouveModel {
  approuveModel: {
    seance_id: number;
    registration_number: string;
    camp_year_id: number;
  };
  access_token: string;
}
