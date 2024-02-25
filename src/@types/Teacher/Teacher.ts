import { User } from "../Global/User";

// Root Types
export interface TeacherRoot {
  success: boolean;
  message: string;
  data: TeacherDaum[];
}
export interface TeacherDaum {
  id: number;
  uuid: string;
  teacher_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  teacher: Teacher;
  user: User;
}

// Show Response
export interface TeacherShowResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  uuid: string;
  teacher_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  teacher: Teacher;
  user: User;
}

// Common
export interface Teacher {
  id: number;
  uuid: string;
  title: string;
  registration_number: string;
  banner: string;
  responsibility: string;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}
