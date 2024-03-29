import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import { UserDeletionModel } from "@/@types/Global/User";
import {
  ApprouveModel,
  GetQrSVGModel,
  GetQrSVGResponse,
  SeanceCreationModel,
  SeanceRoot,
  SeanceShowModel,
  SeanceShowResponse,
  SeanceUpdateModel,
  SeancesShowByDCNFSUMModel,
  SeancesShowByDCNFSUMResponse,
} from "@/@types/Seance/Seance";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const SEANCE_ROUTE = "tenant/seances/";
const SEANCE_BY_DCNFSUM_ROUTE = "tenant/seances/dcnfsum/";
const SEANCE_BY_T_ID_ROUTE = "tenant/seances/storeWithTId";
const AGENT_APPROUVE_MODEL = "tenant/agentApprouves/";
const TEACHER_APPROUVE_MODEL = "tenant/teacherApprouves/";
const STUDENT_APPROUVE_MODEL = "tenant/studentApprouves/";

// Crée une nouvelle API Get all seances
export const seancesApi = createApi({
  reducerPath: "seancesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchSeances: builder.query<SeanceRoot, string>({
      query: (access_token: string | null) => ({
        url: SEANCE_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchSeanceById: builder.query<SeanceShowResponse, SeanceShowModel>({
      query: (seanceShowModel) => ({
        url: `${SEANCE_ROUTE}${seanceShowModel.seanceUuid}`,
        headers: {
          Authorization: `Bearer ${seanceShowModel.access_token}`,
        },
      }),
    }),
    fetchAgentQrSVG: builder.query<GetQrSVGResponse, GetQrSVGModel>({
      query: (getQrSVGModel) => ({
        url: `${SEANCE_ROUTE}${getQrSVGModel.fileName}`,
        headers: {
          Authorization: `Bearer ${getQrSVGModel.access_token}`,
          "Content-Type": "image/svg+xml",
        },
      }),
    }),
    fetchStudentQrSVG: builder.query<GetQrSVGResponse, GetQrSVGModel>({
      query: (getQrSVGModel) => ({
        url: `${SEANCE_ROUTE}${getQrSVGModel.fileName}`,
        headers: {
          Authorization: `Bearer ${getQrSVGModel.access_token}`,
          "Content-Type": "image/svg+xml",
        },
      }),
    }),
    fetchTeacherQrSVG: builder.query<GetQrSVGResponse, GetQrSVGModel>({
      query: (getQrSVGModel) => ({
        url: `${SEANCE_ROUTE}${getQrSVGModel.fileName}`,
        headers: {
          Authorization: `Bearer ${getQrSVGModel.access_token}`,
          "Content-Type": "image/svg+xml",
        },
      }),
    }),

    fetchSeancesByDCNFSUM: builder.query<SeanceRoot, SeancesShowByDCNFSUMModel>(
      {
        query: (seancesByDCNFSUMShowModel) => ({
          url: `${SEANCE_BY_DCNFSUM_ROUTE}${seancesByDCNFSUMShowModel.dcnfsum_id}`,
          headers: {
            Authorization: `Bearer ${seancesByDCNFSUMShowModel.access_token}`,
          },
        }),
      }
    ),
    createSeance: builder.mutation<
      GeneriqueResponse,
      Partial<SeanceCreationModel>
    >({
      query: (seanceCreationModel) => ({
        url: SEANCE_BY_T_ID_ROUTE,
        method: "POST",
        body: seanceCreationModel.newSeance,
        headers: {
          Authorization: `Bearer ${seanceCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    agentApprouve: builder.mutation<GeneriqueResponse, Partial<ApprouveModel>>({
      query: (approuveModel) => ({
        url: AGENT_APPROUVE_MODEL,
        method: "POST",
        body: approuveModel.approuveModel,
        headers: {
          Authorization: `Bearer ${approuveModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    teacherApprouve: builder.mutation<
      GeneriqueResponse,
      Partial<ApprouveModel>
    >({
      query: (approuveModel) => ({
        url: TEACHER_APPROUVE_MODEL,
        method: "POST",
        body: approuveModel.approuveModel,
        headers: {
          Authorization: `Bearer ${approuveModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    studentApprouve: builder.mutation<
      GeneriqueResponse,
      Partial<ApprouveModel>
    >({
      query: (approuveModel) => ({
        url: STUDENT_APPROUVE_MODEL,
        method: "POST",
        body: approuveModel.approuveModel,
        headers: {
          Authorization: `Bearer ${approuveModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteSeance: builder.mutation<
      GeneriqueResponse,
      Partial<UserDeletionModel>
    >({
      query: (userDeletionModel) => ({
        url: `${SEANCE_ROUTE}${userDeletionModel.userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateSeance: builder.mutation<
      GeneriqueResponse,
      Partial<SeanceUpdateModel>
    >({
      query: (seanceUpdateModel) => ({
        url: `${SEANCE_ROUTE}${seanceUpdateModel.seanceUuid}`,
        method: "PUT", // Utilisez PUT pour mettre à jour les données
        body: seanceUpdateModel.updateSeance, // Les données mises à jour à envoyer dans le corps de la requête
        headers: {
          Authorization: `Bearer ${seanceUpdateModel.access_token}`,
        },
      }),
    }),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchSeancesQuery,
  useCreateSeanceMutation,
  useDeleteSeanceMutation,
  useFetchSeanceByIdQuery,
  useUpdateSeanceMutation,
  useFetchSeancesByDCNFSUMQuery,
  useFetchAgentQrSVGQuery,
  useAgentApprouveMutation,
  useStudentApprouveMutation,
  useTeacherApprouveMutation,
  useFetchStudentQrSVGQuery,
  useFetchTeacherQrSVGQuery,
} = seancesApi;
