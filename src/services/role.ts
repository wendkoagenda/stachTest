import {
  PermissionsByRoleIdResponse,
  RoleRoot,
  RoleShowModel,
  RoleShowResponse,
} from "@/@types/Role/Role";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ROLE__ROUTE = "tenant/roles/";

// Crée une nouvelle API Get all roles
export const rolesApi = createApi({
  reducerPath: "rolesApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchRoles: builder.query<RoleRoot, string>({
      query: (access_token: string | null) => ({
        url: ROLE__ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchRoleById: builder.query<RoleShowResponse, RoleShowModel>({
      query: (roleShowModel) => ({
        url: `${ROLE__ROUTE}${roleShowModel.role_uuid}`,
        headers: {
          Authorization: `Bearer ${roleShowModel.access_token}`,
        },
      }),
    }),
    fetchPermissionsRoleById: builder.query<
      PermissionsByRoleIdResponse,
      RoleShowModel
    >({
      query: (roleShowModel) => ({
        url: `${ROLE__ROUTE}${roleShowModel.role_uuid}`,
        headers: {
          Authorization: `Bearer ${roleShowModel.access_token}`,
        },
      }),
    }),
    // createRole: builder.mutation<
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
    // deleteRole: builder.mutation<
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
    // updateRole: builder.mutation<
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
  useFetchRolesQuery,
  // useCreateRoleMutation,
  // useDeleteRoleMutation,
  useFetchRoleByIdQuery,
  useFetchPermissionsRoleByIdQuery,
  // useUpdateRoleMutation,
} = rolesApi;
