import { ModuleShowByDCNFModel } from "@/@types/Module/Module";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openModuleCreateDialog } from "@/redux/slices/moduleSlice";
import { useFetchModuleByDCNFQuery } from "@/services/module";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import Footer from "../../components/partials/Footer";
import ModuleDataTableByDCNF from "./components/ModuleDataTableByDCNF";
import CreationDCNFSUMDialog from "./components/creation/DCNFSUM/CreationDCNFSUMDialog";

export default function ModulesListByDCNF() {
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
  const moduleStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.MODULE_STORE
  );
  const moduleList = permissions.userPermissions.includes(
    strings.PERMISSIONS.MODULE_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  const { dcnf_uuid } = useParams();
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const moduleShowByDCNFModel: ModuleShowByDCNFModel = {
    dcnf_uuid: dcnf_uuid,
    access_token: access_token,
  };
  //Hook de récupération de la liste des modules (Redux store)
  const fetchModuleByDCNFQuery = useFetchModuleByDCNFQuery(
    moduleShowByDCNFModel
  );
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchModuleByDCNFQueryData = fetchModuleByDCNFQuery.data?.data;
  const isLoading = fetchModuleByDCNFQuery.isLoading;
  const modules = Array.isArray(fetchModuleByDCNFQueryData)
    ? fetchModuleByDCNFQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un module
  const onCreateClick = () => {
    dispatch(openModuleCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-6">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.LIST_MODULE}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(modules) ? (
                modules.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="col-6 text-end">
          {moduleStore && (
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
                  <p>{strings.TOOLTIPS.ADD_MODULE}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="mt-2">{moduleList && <ModuleDataTableByDCNF />}</div>
      <CreationDCNFSUMDialog />
      <Footer />
    </>
  );
}
