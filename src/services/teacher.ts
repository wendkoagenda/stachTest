import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  UserCreationModel,
  UserDeletionModel,
  UserShowModel,
  UserUpdateModel,
} from "@/@types/Global/User";
import { TeacherRoot, TeacherShowResponse } from "@/@types/Teacher/Teacher";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const STUDENT_USER_ROUTE = "tenant/teacherUser/";
const STUDENT_ROUTE = "tenant/teachers/";

// Crée une nouvelle API Get all teachers
export const teachersApi = createApi({
  reducerPath: "teachersApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchTeachers: builder.query<TeacherRoot, string>({
      query: (access_token: string | null) => ({
        url: STUDENT_USER_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchTeacherById: builder.query<TeacherShowResponse, UserShowModel>({
      query: (userShowModel) => ({
        url: `${STUDENT_USER_ROUTE}${userShowModel.userUuid}`,
        headers: {
          Authorization: `Bearer ${userShowModel.access_token}`,
        },
      }),
    }),
    createTeacher: builder.mutation<
      GeneriqueResponse,
      Partial<UserCreationModel>
    >({
      query: (userCreationModel) => ({
        url: STUDENT_ROUTE,
        method: "POST",
        body: userCreationModel.newUser,
        headers: {
          Authorization: `Bearer ${userCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteTeacher: builder.mutation<
      GeneriqueResponse,
      Partial<UserDeletionModel>
    >({
      query: (userDeletionModel) => ({
        url: `${STUDENT_ROUTE}${userDeletionModel.userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateTeacher: builder.mutation<
      GeneriqueResponse,
      Partial<UserUpdateModel>
    >({
      query: (userUpdateModel) => ({
        url: `${STUDENT_ROUTE}${userUpdateModel.userUuid}`,
        method: "PUT", // Utilisez PUT pour mettre à jour les données
        body: userUpdateModel.updateUser, // Les données mises à jour à envoyer dans le corps de la requête
        headers: {
          Authorization: `Bearer ${userUpdateModel.access_token}`,
        },
      }),
    }),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchTeachersQuery,
  useCreateTeacherMutation,
  useDeleteTeacherMutation,
  useFetchTeacherByIdQuery,
  useUpdateTeacherMutation,
} = teachersApi;
