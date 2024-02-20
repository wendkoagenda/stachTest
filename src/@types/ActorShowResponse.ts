export interface ActorShowResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  agent: Agent;
  user: User;
}

export interface Agent {
  id: number;
  uuid: string;
  title: string;
  registration_number: string;
  banner: string;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}

enum Gender {
  male = "male",
  female = "female",
}

export interface User {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  email: string;
  phone1: string;
  phone2: string;
  is_active: boolean;
  created_by: number;
  created_at: string;
  updated_at: string;
}
