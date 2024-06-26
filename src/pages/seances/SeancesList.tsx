import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openSeanceCreateDialog } from "@/redux/slices/seanceSlice";
import { useFetchSeancesQuery } from "@/services/seance";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import Footer from "../../components/partials/Footer";
import SeanceDataTable from "./components/SeanceDataTable";
import CreationSeanceDialog from "./components/creation";
import loadPermissions from "@/utils/hooks/loadPermissions";

export default function SeancesList() {
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
  const seanceStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_STORE
  );
  const seanceList = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des seances (Redux store)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchSeancesQueryData = fetchSeancesQuery.data?.data;
  const isLoading = fetchSeancesQuery.isLoading;
  const seances = Array.isArray(fetchSeancesQueryData)
    ? fetchSeancesQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un seance
  const onCreateClick = () => {
    dispatch(openSeanceCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.LIST_SEANCE}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(seances) ? (
                  seances.length
                ) : (
                  0
                )}
              </Button>
            </h4>
          </div>
          <div className="col-6 text-end">
            {seanceStore && (
              <Button onClick={onCreateClick}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Plus /> <span>{strings.BUTTONS.ADD}</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
        <div className="mt-2">{seanceList && <SeanceDataTable />}</div>
      </div>
      <CreationSeanceDialog />
      <Footer />
    </>
  );
}
