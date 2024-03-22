import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openModuleCreateDialog } from "@/redux/slices/moduleSlice";
import { useFetchModulesQuery } from "@/services/module";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import Footer from "../../components/partials/Footer";
import ModuleDataTable from "./components/ModuleDataTable";
import CreationModuleDialog from "./components/creation";
import loadPermissions from "@/utils/hooks/loadPermissions";

export default function ModulesList() {
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

  //Hook de récupération de la liste des modules (Redux store)
  const fetchModulesQuery = useFetchModulesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchModulesQueryData = fetchModulesQuery.data?.data;
  const isLoading = fetchModulesQuery.isLoading;
  const modules = Array.isArray(fetchModulesQueryData)
    ? fetchModulesQueryData
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
      {/* <HorizontalHeader /> */}
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300"> */}
      <div className="w-full mx-auto ">
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
        <div className="mt-2">{moduleList && <ModuleDataTable />}</div>
      </div>
      <CreationModuleDialog />
      <Footer />
    </>
  );
}
