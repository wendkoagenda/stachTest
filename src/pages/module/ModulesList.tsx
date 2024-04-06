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
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../../components/partials/Footer";
import ModuleDataTable from "./components/ModuleDataTable";
import CreationModuleDialog from "./components/creation";

export default function ModulesList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //Liste des permissions requises
  const [moduleList, setModuleList] = useState(false);
  const [moduleStore, setModuleStore] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setModuleList(
        permissions.userPermissions.includes(strings.PERMISSIONS.MODULES_LIST)
      );
      setModuleStore(
        permissions.userPermissions.includes(strings.PERMISSIONS.MODULES_STORE)
      );
    }
  }, []);

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

  return (
    <>
      <div className="w-full mx-auto ">
        <div className="md:grid md:grid-cols-1 md:gap-4 grid grid-cols-1 gap-1">
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
        <div className="mt-2">{moduleList && <ModuleDataTable />}</div>
      </div>
      <CreationModuleDialog />
    </>
  );
}
