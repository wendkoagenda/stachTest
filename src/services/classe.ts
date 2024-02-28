import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  UserCreationModel,
  UserDeletionModel,
  UserShowModel,
  UserUpdateModel,
} from "@/@types/Global/User";
import {
  ClasseRoot,
  ClasseShowByDCModel,
  ClasseShowByDCRoot,
  ClasseShowModel,
  ClasseShowResponse,
} from "@/@types/Classe/Classe";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CLASSE_ROUTE = "tenant/n_f/";
const CLASSE_BY_DC_ROUTE = "tenant/dc_nf/showByDC/";

// Crée une nouvelle API Get all classes
export const classesApi = createApi({
  reducerPath: "classesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchClasses: builder.query<ClasseRoot, string>({
      query: (access_token: string | null) => ({
        url: CLASSE_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchClasseById: builder.query<ClasseShowResponse, ClasseShowModel>({
      query: (classeShowModel) => ({
        url: `${CLASSE_ROUTE}${classeShowModel.nf_uuid}`,
        headers: {
          Authorization: `Bearer ${classeShowModel.access_token}`,
        },
      }),
    }),
    fetchClassesByDCUuId: builder.query<
      ClasseShowByDCRoot,
      ClasseShowByDCModel
    >({
      query: (classeShowByDCModel) => ({
        url: `${CLASSE_BY_DC_ROUTE}${classeShowByDCModel.dc_uuid}`,
        headers: {
          Authorization: `Bearer ${classeShowByDCModel.access_token}`,
        },
      }),
    }),
    createClasse: builder.mutation<
      GeneriqueResponse,
      Partial<UserCreationModel>
    >({
      query: (userCreationModel) => ({
        url: CLASSE_ROUTE,
        method: "POST",
        body: userCreationModel.newUser,
        headers: {
          Authorization: `Bearer ${userCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteClasse: builder.mutation<
      GeneriqueResponse,
      Partial<UserDeletionModel>
    >({
      query: (userDeletionModel) => ({
        url: `${CLASSE_ROUTE}${userDeletionModel.userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateClasse: builder.mutation<GeneriqueResponse, Partial<UserUpdateModel>>(
      {
        query: (userUpdateModel) => ({
          url: `${CLASSE_ROUTE}${userUpdateModel.userUuid}`,
          method: "PUT", // Utilisez PUT pour mettre à jour les données
          body: userUpdateModel.updateUser, // Les données mises à jour à envoyer dans le corps de la requête
          headers: {
            Authorization: `Bearer ${userUpdateModel.access_token}`,
          },
        }),
      }
    ),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchClassesQuery,
  useCreateClasseMutation,
  useDeleteClasseMutation,
  useFetchClasseByIdQuery,
  useUpdateClasseMutation,
  useFetchClassesByDCUuIdQuery,
} = classesApi;
