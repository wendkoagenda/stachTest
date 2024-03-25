import { User } from "../Global/User";

// Root Types
export interface StudentRoot {
  success: boolean;
  message: string;
  data: StudentDaum[];
}
export interface StudentDaum {
  id: number;
  uuid: string;
  student_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  student: Student;
  user: User;
}

// Show Response
export interface StudentShowResponse {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  uuid: string;
  student_id: number;
  user_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
  student: Student;
  user: User;
}

// Common
export interface Student {
  id: number;
  uuid: string;
  title: string;
  registration_number: string;
  banner: string;
  responsibility: Responsibility;
  created_at: string;
  updated_at: string;
  camp_year_id: number;
}

type Responsibility =
  | "delegue"
  | "sub_delegue"
  | "delegue_inter"
  | "delegue"
  | "sub_delegue_inter"
  | "none";

export interface UpdateResponsibilityModel {
  updateResponsibility: {
    responsibility: string;
  };
  access_token: string;
  student_id: number;
}
