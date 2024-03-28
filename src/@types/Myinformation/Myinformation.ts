import { Agent } from "../Agent/Agent";
import { User } from "../Global/User";
import { Student } from "../Student/Student";
import { Teacher } from "../Teacher/Teacher";

export interface MyUserInformationRoot {
  success: boolean;
  message: string;
  data: User;
}
export interface MyAgentInformationRoot {
  success: boolean;
  message: string;
  data: MyAgentInformationDaum;
}
export interface MyAgentInformationDaum {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  agent: Agent;
}
export interface MyStudentInformationDaum {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  student: Student;
}
export interface MyTeacherInformationDaum {
  id: number;
  uuid: string;
  agent_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  teacher: Teacher;
}
export interface MyTeacherInformationRoot {
  id: number;
  uuid: string;
  teacher_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  data: MyTeacherInformationDaum;
}
export interface MyStudentInformationRoot {
  id: number;
  uuid: string;
  student_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  data: MyStudentInformationDaum;
}
