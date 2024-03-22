import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openAgentCreateDialog } from "@/redux/slices/agentSlice";
import { useFetchAgentsQuery } from "@/services/agent";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import Footer from "../../components/partials/Footer";
import AgentDataTable from "./components/AgentDataTable";
import CreationAgentDialog from "./components/creation";

export default function AgentsList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const agentStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.AGNET_STORE
  );
  const agentList = permissions.userPermissions.includes(
    strings.PERMISSIONS.AGNET_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des agents (Redux store)
  const fetchAgentsQuery = useFetchAgentsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchAgentsQueryData = fetchAgentsQuery.data?.data;
  const isLoading = fetchAgentsQuery.isLoading;
  const agents = Array.isArray(fetchAgentsQueryData)
    ? fetchAgentsQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un agent
  const onCreateClick = () => {
    dispatch(openAgentCreateDialog());
  };
  //*******************Fin

  return (
    <>
      {/* <HorizontalHeader /> */}
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300"> */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.LIST_AGENT}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(agents) ? (
                  agents.length
                ) : (
                  0
                )}
              </Button>
            </h4>
          </div>
          <div className="col-6 text-end">
            {agentStore && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={onCreateClick}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus /> <span>{strings.BUTTONS.ADD}</span>
                        </>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.ADD_AGENT}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="mt-2">{agentList && <AgentDataTable />}</div>
      </div>
      <CreationAgentDialog />
      <Footer />
    </>
  );
}
