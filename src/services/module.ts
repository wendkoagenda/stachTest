import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  AssigneModel,
  DCNFSUMShowModel,
  DCNFSUMShowResponse,
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
  StudentAllowUpdateModel,
} from "@/@types/Module/Module";
import {
  DcnfsumtResponse,
  MyClassesShowByDCNFModel,
} from "@/@types/Singles/Dcnfsumt";
import { SuMRoot } from "@/@types/Singles/SuM";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MODULE_ROUTE = "tenant/modules/";
const MODULE_BY_DCNF_ROUTE = "tenant/dcnf_sum/dc_nf/";
const DCNF_SUM_ROUTE = "tenant/dcnf_sum/";
const SUM_ROUTE = "tenant/su_m/";
const DCNFSUM_ROUTE = "tenant/dcnf_sum/";
const DCNFSUMT_ROUTE = "tenant/dcnfsum_t/";
const My_MODULE_ROUTE = "tenant/dcnfsum_t/mesModules/";
const MY_MODULE_BY_DCNF_ROUTE = "tenant/dcnfsum_t/getModulesByDCNF/";
const UPDATE_STUDNET_ALLOW_ROUTE = "tenant/dcnfsum_t/changeStudentAllowEntry/";

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
    fetchMymodules: builder.query<DcnfsumtResponse, string>({
      // les mosules du prof connecter
      query: (access_token: string | null) => ({
        url: My_MODULE_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchDCNFSUMById: builder.query<DCNFSUMShowResponse, DCNFSUMShowModel>({
      // module finale
      query: (DCNFSUMSShowModel) => ({
        url: `${DCNFSUM_ROUTE}${DCNFSUMSShowModel.dcnfsum_uuid}`,
        headers: {
          Authorization: `Bearer ${DCNFSUMSShowModel.access_token}`,
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
    fetchMyClasseDetails: builder.query<
      DcnfsumtResponse,
      MyClassesShowByDCNFModel
    >({
      query: (myClassesShowByDCNFModel) => ({
        url: `${MY_MODULE_BY_DCNF_ROUTE}${myClassesShowByDCNFModel.dcnf_id}`,
        headers: {
          Authorization: `Bearer ${myClassesShowByDCNFModel.access_token}`,
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
    createDCNFSUMT: builder.mutation<GeneriqueResponse, Partial<AssigneModel>>({
      query: (assigneModel) => ({
        url: DCNFSUMT_ROUTE,
        method: "POST",
        body: assigneModel.newAssigne,
        headers: {
          Authorization: `Bearer ${assigneModel.access_token}`,
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
    updateStudentAllow: builder.mutation<
      GeneriqueResponse,
      Partial<StudentAllowUpdateModel>
    >({
      query: (studentAllowUpdateModel) => ({
        url: `${UPDATE_STUDNET_ALLOW_ROUTE}${studentAllowUpdateModel.dcnfsum_id}`,
        method: "PUT", // Utilisez PUT pour mettre à jour les données
        body: {}, // Les données mises à jour à envoyer dans le corps de la requête
        headers: {
          Authorization: `Bearer ${studentAllowUpdateModel.access_token}`,
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
  useFetchDCNFSUMByIdQuery,
  useUpdateModuleMutation,
  useDeleteDCNF_SUMMutation,
  useFetchSUMsQuery,
  useCreateDCNF_SUMMutation,
  useCreateDCNFSUMTMutation,
  useFetchMymodulesQuery,
  useFetchMyClasseDetailsQuery,
  useUpdateStudentAllowMutation,
} = modulesApi;
