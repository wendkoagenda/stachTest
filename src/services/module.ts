import { GeneriqueResponse } from "@/@types/Global/GeneriqueResponse";
import {
  UserCreationModel,
  UserDeletionModel,
  UserShowModel,
  UserUpdateModel,
} from "@/@types/Global/User";
import {
  ModuleCreationModel,
  ModuleRoot,
  ModuleShowResponse,
} from "@/@types/Module/Module";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const MODULE_ROUTE = "tenant/modules/";

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
    fetchModuleById: builder.query<ModuleShowResponse, UserShowModel>({
      query: (userShowModel) => ({
        url: `${MODULE_ROUTE}${userShowModel.userUuid}`,
        headers: {
          Authorization: `Bearer ${userShowModel.access_token}`,
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
    deleteModule: builder.mutation<
      GeneriqueResponse,
      Partial<UserDeletionModel>
    >({
      query: (userDeletionModel) => ({
        url: `${MODULE_ROUTE}${userDeletionModel.userId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${userDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateModule: builder.mutation<GeneriqueResponse, Partial<UserUpdateModel>>(
      {
        query: (userUpdateModel) => ({
          url: `${MODULE_ROUTE}${userUpdateModel.userUuid}`,
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
  useFetchModulesQuery,
  useCreateModuleMutation,
  useDeleteModuleMutation,
  useFetchModuleByIdQuery,
  useUpdateModuleMutation,
} = modulesApi;
