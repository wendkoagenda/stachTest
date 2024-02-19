import { ActorCreationModel } from "@/@types/ActorCreationModel";
import { ActorCreationResponse } from "@/@types/ActorCreationResponse";
import { AgentRoot } from "@/@types/Agent";
import { ActorDeletionModel } from "@/@types/actorDeletionModel";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AGENT_ROUTE = "tenant/agentUser/";
const AGENT_CREATE_ROUTE = "tenant/agents/";
const AGENT_DELETE_ROUTE = "tenant/agents/";
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
    createAgent: builder.mutation<
      ActorCreationResponse,
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
    deleteAgent: builder.mutation<void, Partial<ActorDeletionModel>>({
      query: (actorDeletionModel) => ({
        url: `${AGENT_DELETE_ROUTE}${actorDeletionModel.actorId}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${actorDeletionModel.access_token}`, // Ajoutez le token d'accès dans les en-têtes de la requête
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
} = agentsApi;
