import { ActiveDesactiveModdel } from "@/@types/ActiveDesactiveModel";
import { ActorCreationModel } from "@/@types/ActorCreationModel";
import getConfig from "@/config";
import axios from "axios";

const AGENT_ROUTE = "tenant/agentUser/";
const AGENT_CREATE_ROUTE = "tenant/agents/";
const AGENT_UPDATE_ROUTE = "tenant/agents/";
const AGENT_DELETE_ROUTE = "tenant/agents/";

const ACTIVE_DESACTIVE_ROUTE = "tenant/users/activeDesactive";

class _AgnetService {
  fetchAgents(access_access_token: string) {
    return axios.get(`${getConfig().apiBaseUrl}${AGENT_ROUTE}`, {
      headers: {
        Authorization: `Bearer ${access_access_token}`,
      },
    });
  }
  showAgent(access_token: string, uuid: string) {
    return axios.get(`${getConfig().apiBaseUrl}${AGENT_ROUTE}${uuid}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  createAgent(access_token: string, model: ActorCreationModel) {
    return axios.post(`${getConfig().apiBaseUrl}${AGENT_CREATE_ROUTE}`, model, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
  }

  updateAgents(
    model: ActorCreationModel,
    agentUuid: string,
    access_token: string
  ) {
    return axios.put(
      `${getConfig().apiBaseUrl}${AGENT_UPDATE_ROUTE}${agentUuid}`,
      model,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }

  deleteAgents(agentId: number, access_token: string) {
    return axios.delete(
      `${getConfig().apiBaseUrl}${AGENT_DELETE_ROUTE}${agentId}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }
  statusAgents(model: ActiveDesactiveModdel, access_token: string) {
    return axios.post(
      `${getConfig().apiBaseUrl}${ACTIVE_DESACTIVE_ROUTE}`,
      model,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
  }
}

const AgentService = new _AgnetService();
export default AgentService;
