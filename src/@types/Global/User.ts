export interface User {
  id: number;
  uuid: string;
  first_name: string;
  last_name: string;
  gender: Gender;
  email: string;
  email_verified_at?: string;
  phone1: string;
  phone2: string;
  is_active: number;
  created_by?: number;
  created_at: string;
  updated_at: string;
}

export interface UserCreationModel {
  newUser: {
    title: string;
    banner: string;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    phone1: string;
    phone2: string;
    is_active: boolean;
    camp_year_id: number;
  };
  access_token: string;
}

export interface UserUpdateModel {
  updateUser: {
    title: string;
    banner: string;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
    phone1: string;
    phone2: string;
    is_active: boolean;
    camp_year_id: number;
  };
  access_token: string;
  userUuid: string;
}

export interface UserDeletionModel {
  access_token: string;
  userId: number;
}

export interface UserShowModel {
  access_token: string;
  userUuid: string;
}

type Gender = "male" | "female";
