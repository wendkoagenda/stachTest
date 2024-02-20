export interface ActorUpdateModel {
  updateActor: {
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
  actorUuid: string;
}
