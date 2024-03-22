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

export default function AllfinalclassesList() {
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
  const departementStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_STORE
  );
  const departementList = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_LIST
  );
  //*******************Fin

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
  const handleCreateDCNF = () => {
    dispatch(openDCNFCreateDialog());
  };
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
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
          <div className="col-6 text-end">
            {departementStore && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button onClick={handleCreateDCNF}>
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
                    <p>{strings.TOOLTIPS.ADD_STUDENT}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="mt-2">
          {departementList && <AllfinalclassesDataTable />}
        </div>
      </div>
      <CreationDCNFDialog />
      <Footer />
    </>
  );
}
