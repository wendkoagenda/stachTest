export type AgentUser = {
  success: boolean;
  message: string;
  data: Data;
};

type Data = {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  agent: Agent;
  user: User;
};

type Agent = {
  id: number;
  uuid: string;
  title: string;
  registration_number: string;
  banner: string;
  created_at: string;
  updated_at: string;
};

type User = {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  gender: string;
  email: string;
  phone1: string;
  phone2: string;
  created_at: string;
  updated_at: string;
  is_active: number;
};
