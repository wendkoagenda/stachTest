import {
  DepartementRoot,
  DepartementShowModel,
  DepartementShowResponse,
} from "@/@types/Departement/Departement";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const DC__ROUTE = "tenant/d_c/";

// Crée une nouvelle API Get all departements
export const departementsApi = createApi({
  reducerPath: "departementsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchDepartements: builder.query<DepartementRoot, string>({
      query: (access_token: string | null) => ({
        url: DC__ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchDepartementById: builder.query<
      DepartementShowResponse,
      DepartementShowModel
    >({
      query: (departementShowModel) => ({
        url: `${DC__ROUTE}${departementShowModel.dc_uuid}`,
        headers: {
          Authorization: `Bearer ${departementShowModel.access_token}`,
        },
      }),
    }),
    // createDepartement: builder.mutation<
    //   GeneriqueResponse,
    //   Partial<UserCreationModel>
    // >({
    //   query: (userCreationModel) => ({
    //     url: STUDENT_ROUTE,
    //     method: "POST",
    //     body: userCreationModel.newUser,
    //     headers: {
    //       Authorization: `Bearer ${userCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
    //     },
    //   }),
    // }),
    // deleteDepartement: builder.mutation<
    //   GeneriqueResponse,
    //   Partial<UserDeletionModel>
    // >({
    //   query: (userDeletionModel) => ({
    //     url: `${STUDENT_ROUTE}${userDeletionModel.userId}`,
    //     method: "DELETE",
    //     headers: {
    //       Authorization: `Bearer ${userDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
    //     },
    //   }),
    // }),
    // updateDepartement: builder.mutation<
    //   GeneriqueResponse,
    //   Partial<UserUpdateModel>
    // >({
    //   query: (userUpdateModel) => ({
    //     url: `${STUDENT_ROUTE}${userUpdateModel.userUuid}`,
    //     method: "PUT", // Utilisez PUT pour mettre à jour les données
    //     body: userUpdateModel.updateUser, // Les données mises à jour à envoyer dans le corps de la requête
    //     headers: {
    //       Authorization: `Bearer ${userUpdateModel.access_token}`,
    //     },
    //   }),
    // }),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchDepartementsQuery,
  // useCreateDepartementMutation,
  // useDeleteDepartementMutation,
  useFetchDepartementByIdQuery,
  // useUpdateDepartementMutation,
} = departementsApi;
