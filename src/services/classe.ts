import {
  ClasseRoot,
  ClasseShowByDCModel,
  ClasseShowByDCNFResponse,
  ClasseShowByDCRoot,
  ClasseShowModel,
  ClasseShowResponse,
} from "@/@types/Classe/Classe";
import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  UserCreationModel,
  UserDeletionModel,
  UserUpdateModel,
} from "@/@types/Global/User";
import { DCNFRoot } from "@/@types/Singles/Dcnf";
import { DcnfsumtResponse } from "@/@types/Singles/Dcnfsumt";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CLASSE_ROUTE = "tenant/n_f/";
const CLASSE_DCNFROUTE = "tenant/dc_nf/";
const CLASSE_BY_DC_ROUTE = "tenant/dc_nf/showByDC/";
const CLASSE_DCNFS_ROUTE = "tenant/dcnf_s/dc_nf/";
const DCNF_ROUTE = "tenant/dc_nf/";
const My_COURSES_ROUTE = "tenant/dcnfsum_t/getMycourses/";

// Crée une nouvelle API Get all classes
export const classesApi = createApi({
  reducerPath: "classesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchClasses: builder.query<ClasseRoot, string>({
      // les classes simples nf
      query: (access_token: string | null) => ({
        url: CLASSE_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchMycourses: builder.query<DcnfsumtResponse, string>({
      // les mosules du prof connecter
      query: (access_token: string | null) => ({
        url: My_COURSES_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    // pour allfinalclasses (les classes finales)
    fetchDCNFs: builder.query<DCNFRoot, string>({
      query: (access_token: string | null) => ({
        url: DCNF_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchClasseById: builder.query<ClasseShowResponse, ClasseShowModel>({
      query: (classeShowModel) => ({
        url: `${CLASSE_DCNFROUTE}${classeShowModel.dcnf_uuid}`,
        headers: {
          Authorization: `Bearer ${classeShowModel.access_token}`,
        },
      }),
    }),
    // la liste des etudiants d ela classe
    fetchClassesByDCNF: builder.query<
      ClasseShowByDCNFResponse,
      ClasseShowModel
    >({
      query: (classeShowModel) => ({
        url: `${CLASSE_DCNFS_ROUTE}${classeShowModel.dcnf_uuid}`,
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
    createDCNF: builder.mutation<GeneriqueResponse, Partial<UserCreationModel>>(
      {
        query: (userCreationModel) => ({
          url: DCNF_ROUTE,
          method: "POST",
          body: userCreationModel.newUser,
          headers: {
            Authorization: `Bearer ${userCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
          },
        }),
      }
    ),
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
  useFetchClassesByDCNFQuery,
  useUpdateClasseMutation,
  useFetchClassesByDCUuIdQuery,
  useFetchDCNFsQuery,
  useCreateDCNFMutation,
  useFetchMycoursesQuery,
} = classesApi;
