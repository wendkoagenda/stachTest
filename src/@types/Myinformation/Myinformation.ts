import { User } from "../Global/User";

export interface MyUserInformationRoot {
  success: boolean;
  message: string;
  data: User;
}
