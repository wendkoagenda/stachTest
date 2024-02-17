import HorizontalHeader from "@/components/partials/HorizontalHeader";
import Footer from "../../components/partials/Footer";
import AgentDataTable from "./components/AgentDataTable";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents, openAgentCreateDialog } from "@/redux/slices/agentSlice";
import { RootState } from "@/redux/RootState";
import { useEffect } from "react";
import { Loader2, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreationAgentDialog from "./components/creation";
import strings from "@/constants/strings.constant";
export default function AgentsList() {
  // Var dispatch hook
  const dispatch = useDispatch();
  // var access_token
  const access_token = localStorage.getItem(
    "__kgfwe29__97efiyfcljbf68EF79WEFAD"
  );

  // Store Data Fetching
  useEffect(() => {
    dispatch(fetchAgents({ access_token }));
  }, [dispatch, access_token]);

  const agents = useSelector((state: RootState) => state.agents.data);
  const isLoading = useSelector((state: RootState) => state.agents.isLoading);

  // Creation
  const onCreateClick = () => {
    dispatch(openAgentCreateDialog());
  };

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
