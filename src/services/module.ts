import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  DCNF_SUMCreationModel,
  DCNF_SUMDeletionModel,
  ModuleCreationModel,
  ModuleDeletionModel,
  ModuleRoot,
  ModuleShowByDCNFModel,
  ModuleShowByDCNFResponse,
  ModuleShowModel,
  ModuleShowResponse,
  ModuleUpdateModel,
} from "@/@types/Module/Module";
import { SuMRoot } from "@/@types/Singles/Sum";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MODULE_ROUTE = "tenant/modules/";
const MODULE_BY_DCNF_ROUTE = "tenant/dcnf_sum/dc_nf/";
const DCNF_SUM_ROUTE = "tenant/dcnf_sum/";
const SUM_ROUTE = "tenant/su_m/";

// Crée une nouvelle API Get all modules
export const modulesApi = createApi({
  reducerPath: "modulesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchModules: builder.query<ModuleRoot, string>({
      query: (access_token: string | null) => ({
        url: MODULE_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchSUMs: builder.query<SuMRoot, string>({
      query: (access_token: string | null) => ({
        url: SUM_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchModuleById: builder.query<ModuleShowResponse, ModuleShowModel>({
      query: (moduleShowModel) => ({
        url: `${MODULE_ROUTE}${moduleShowModel.moduleUuid}`,
        headers: {
          Authorization: `Bearer ${moduleShowModel.access_token}`,
        },
      }),
    }),
    fetchModuleByDCNF: builder.query<
      ModuleShowByDCNFResponse,
      ModuleShowByDCNFModel
    >({
      query: (moduleShowByDCNFModel) => ({
        url: `${MODULE_BY_DCNF_ROUTE}${moduleShowByDCNFModel.dcnf_uuid}`,
        headers: {
          Authorization: `Bearer ${moduleShowByDCNFModel.access_token}`,
        },
      }),
    }),
    createModule: builder.mutation<
      GeneriqueResponse,
      Partial<ModuleCreationModel>
    >({
      query: (moduleCreationModel) => ({
        url: MODULE_ROUTE,
        method: "POST",
        body: moduleCreationModel.newModule,
        headers: {
          Authorization: `Bearer ${moduleCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    createDCNF_SUM: builder.mutation<
      GeneriqueResponse,
      Partial<DCNF_SUMCreationModel>
    >({
      query: (dcnf_sumCreationModel) => ({
        url: DCNF_SUM_ROUTE,
        method: "POST",
        body: dcnf_sumCreationModel.newDcnfSum,
        headers: {
          Authorization: `Bearer ${dcnf_sumCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteModule: builder.mutation<
      GeneriqueResponse,
      Partial<ModuleDeletionModel>
    >({
      query: (moduleDeletionModel) => ({
        url: `${MODULE_ROUTE}${moduleDeletionModel.moduleId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${moduleDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteDCNF_SUM: builder.mutation<
      GeneriqueResponse,
      Partial<DCNF_SUMDeletionModel>
    >({
      query: (dcnf_sumDeletionModel) => ({
        url: `${DCNF_SUM_ROUTE}${dcnf_sumDeletionModel.dcnf_sum_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${dcnf_sumDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateModule: builder.mutation<
      GeneriqueResponse,
      Partial<ModuleUpdateModel>
    >({
      query: (moduleUpdateModel) => ({
        url: `${MODULE_ROUTE}${moduleUpdateModel.moduleUuid}`,
        method: "PUT", // Utilisez PUT pour mettre à jour les données
        body: moduleUpdateModel.updateModule, // Les données mises à jour à envoyer dans le corps de la requête
        headers: {
          Authorization: `Bearer ${moduleUpdateModel.access_token}`,
        },
      }),
    }),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchModulesQuery,
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useFetchModuleByIdQuery,
  useFetchModuleByDCNFQuery,
  useUpdateModuleMutation,
  useDeleteDCNF_SUMMutation,
  useFetchSUMsQuery,
  useCreateDCNF_SUMMutation,
} = modulesApi;