import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { fetchAgents, openAgentCreateDialog } from "@/redux/slices/agentSlice";
import { useFetchAgentsQuery } from "@/services/agent";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import { useEffect } from "react";
import Footer from "../../components/partials/Footer";
import AgentDataTable from "./components/AgentDataTable";
import CreationAgentDialog from "./components/creation";
export default function AgentsList() {
  // Var dispatch hook
  const dispatch = useAppDispatch();
  // var access_token
  const access_token: string =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ||
    "access_token";

  // Store Data Fetching
  useEffect(() => {
    dispatch(fetchAgents({ access_token: access_token }));
  }, [dispatch, access_token]);

  const agents = useAppSelector((state) => state.agents.data);
  // const isLoading = useAppSelector((state) => state.agents.isLoading);

  // Creation
  const onCreateClick = () => {
    dispatch(openAgentCreateDialog());
  };
  const isLoading = useFetchAgentsQuery(access_token)?.isLoading || false;

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
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
          </div>
        </div>
        <div className="mt-2">
          <AgentDataTable />
        </div>
      </div>
      <CreationAgentDialog />
      <Footer />
    </>
  );
}
