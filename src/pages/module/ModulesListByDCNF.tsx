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
import { useEffect, useState } from "react";

export default function ModulesListByDCNF({
  props_dcnf_uuid,
}: {
  props_dcnf_uuid?: string;
}) {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //Liste des permissions requises
  const [dcnfsumStore, setDCNFSUStore] = useState(false);
  const [dcnfsumList, setDCNFSUMList] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCNFSUStore(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_USER_LIST
        )
      );
      setDCNFSUMList(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNFSUM_LIST)
      );
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)

  const { dcnf_uuid } = useParams();
  const dcnf_uuid_value = dcnf_uuid !== undefined ? dcnf_uuid : props_dcnf_uuid;
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const moduleShowByDCNFModel: ModuleShowByDCNFModel = {
    dcnf_uuid: dcnf_uuid_value,
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

  return (
    <>
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
      <div className="mt-2">
        {dcnfsumList && (
          <ModuleDataTableByDCNF props_dcnf_uuid={dcnf_uuid_value} />
        )}
      </div>
      <CreationDCNFSUMDialog />
      <Footer />
    </>
  );
}
