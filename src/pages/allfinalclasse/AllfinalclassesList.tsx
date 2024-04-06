import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openDCNFCreateDialog } from "@/redux/slices/classeSlice";
import { useFetchDCNFsQuery } from "@/services/classe";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import AllfinalclassesDataTable from "./components/AllfinalclassesDataTable";
import CreationDCNFDialog from "./components/creation/CreationDCNFDialog";
import { useEffect, useState } from "react";

export default function AllfinalclassesList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //Liste des permissions requises
  const [dcnfList, setDCNFList] = useState(false);
  const [dcnfStore, setDCNFStore] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCNFList(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_LIST)
      );
      setDCNFStore(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_STORE)
      );
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des departements (Redux store)
  const fetchDCNFsQuery = useFetchDCNFsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchDCNFsQueryData = fetchDCNFsQuery.data?.data;
  const isLoading = fetchDCNFsQuery.isLoading;
  const allfinalclasses = Array.isArray(fetchDCNFsQueryData)
    ? fetchDCNFsQueryData
    : [];
  //*******************Fin

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="md:grid md:grid-cols-1 md:gap-4 grid grid-cols-1 gap-1">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.LIST_CLASSE}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(allfinalclasses) ? (
                allfinalclasses.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="mt-2">{dcnfList && <AllfinalclassesDataTable />}</div>
      </div>
      <CreationDCNFDialog />
      <Footer />
    </>
  );
}
