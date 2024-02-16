export interface Root {
  success: boolean;
  message: string;
  data: AgentDaum[];
}

export interface AgentDaum {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_by?: number;
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
  created_by?: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}

export interface User {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  email_verified_at?: string;
  phone1: string;
  phone2: string;
  is_active: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}
