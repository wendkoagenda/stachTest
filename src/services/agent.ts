import { AgentRoot } from "@/@types/Agent";
import getConfig from "@/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const AGENT_ROUTE = "tenant/agentUser/";

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
  }),
});
// Exporte les hooks générés automatiquement
export const { useFetchAgentsQuery } = agentsApi;
