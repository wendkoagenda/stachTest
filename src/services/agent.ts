import { ActorCreationModel } from "@/@types/ActorCreationModel";
import { ActorDeletionModel } from "@/@types/ActorDeletionModel";
import { ActorGeneriqueResponse } from "@/@types/ActorGeneriqueResponse";
import { ActorShowModel } from "@/@types/ActorShowModel";
import { ActorShowResponse } from "@/@types/ActorShowResponse";
import { ActorUpdateModel } from "@/@types/ActorUpdateModel";
import { AgentRoot } from "@/@types/Agent";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AGENT_ROUTE = "tenant/agentUser/";
const AGENT_CREATE_ROUTE = "tenant/agents/";
const AGENT_DELETE_ROUTE = "tenant/agents/";
const AGENT_UPDATE_ROUTE = "tenant/agents/";
const AGENT_ROUTE_SHOW = "tenant/agentUser/";
// Crée une nouvelle API Get all agents
export const agentsApi = createApi({
  reducerPath: "agentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: getConfig().apiBaseUrl }), // Utilise fetchBaseQuery avec l'URL de base
  endpoints: (builder) => ({
    fetchAgents: builder.query<AgentRoot, string>({
      query: (access_token: string | null) => ({
        url: AGENT_ROUTE,
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    fetchAgentById: builder.query<ActorShowResponse, ActorShowModel>({
      query: (actoreShowModel) => ({
        url: `${AGENT_ROUTE_SHOW}${actoreShowModel.actorUuid}`,
        headers: {
          Authorization: `Bearer ${actoreShowModel.access_token}`,
        },
      }),
    }),
    createAgent: builder.mutation<
      ActorGeneriqueResponse,
      Partial<ActorCreationModel>
    >({
      query: (actorCreationModel) => ({
        url: AGENT_CREATE_ROUTE,
        method: "POST",
        body: actorCreationModel.newActor,
        headers: {
          Authorization: `Bearer ${actorCreationModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    deleteAgent: builder.mutation<
      ActorGeneriqueResponse,
      Partial<ActorDeletionModel>
    >({
      query: (actorDeletionModel) => ({
        url: `${AGENT_DELETE_ROUTE}${actorDeletionModel.actorId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${actorDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
        },
      }),
    }),
    updateAgent: builder.mutation<
      ActorGeneriqueResponse,
      Partial<ActorUpdateModel>
    >({
      query: (actorUpdateModel) => ({
        url: `${AGENT_UPDATE_ROUTE}${actorUpdateModel.actorUuid}`,
        method: "PUT", // Utilisez PUT pour mettre à jour les données
        body: actorUpdateModel.updateActor, // Les données mises à jour à envoyer dans le corps de la requête
        headers: {
          Authorization: `Bearer ${actorUpdateModel.access_token}`,
        },
      }),
    }),
  }),
});
// Exporte les hooks générés automatiquement
export const {
  useFetchAgentsQuery,
  useCreateAgentMutation,
  useDeleteAgentMutation,
  useFetchAgentByIdQuery,
  useUpdateAgentMutation,
} = agentsApi;
