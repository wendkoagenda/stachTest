import {
  MyAgentInformationRoot,
  MyStudentInformationRoot,
  MyTeacherInformationRoot,
  MyUserInformationRoot,
} from "@/@types/Myinformation/Myinformation";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MY_USER_INFORMATIONS__ROUTE = "tenant/myUserInformations/";
const MY_STUDENT_INFORMATIONS__ROUTE = "tenant/myStudentInformations/";
const MY_TEACHER_INFORMATIONS__ROUTE = "tenant/myTeacherInformations/";
const MY_AGENT_INFORMATIONS__ROUTE = "tenant/myAgentInformations/";

// Crée une nouvelle API Get all myinformations
export const myinformationsApi = createApi({
  reducerPath: "myinformationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchMyUserInformations: builder.query<MyUserInformationRoot, string>({
      query: (access_token: string | null) => ({
        url: MY_USER_INFORMATIONS__ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchMyAgentInformations: builder.query<MyAgentInformationRoot, string>({
      query: (access_token: string | null) => ({
        url: MY_AGENT_INFORMATIONS__ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchMyTeacherInformations: builder.query<MyTeacherInformationRoot, string>(
      {
        query: (access_token: string | null) => ({
          url: MY_TEACHER_INFORMATIONS__ROUTE,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
      }
    ),
    fetchMyStudentInformations: builder.query<MyStudentInformationRoot, string>(
      {
        query: (access_token: string | null) => ({
          url: MY_STUDENT_INFORMATIONS__ROUTE,
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }),
      }
    ),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchMyUserInformationsQuery,
  useFetchMyAgentInformationsQuery,
  useFetchMyStudentInformationsQuery,
  useFetchMyTeacherInformationsQuery,
} = myinformationsApi;
