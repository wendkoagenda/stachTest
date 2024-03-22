import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openClasseCreateDialog } from "@/redux/slices/classeSlice";
import { useFetchClassesQuery } from "@/services/classe";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import ClasseDataTable from "../dataTable/ClasseDataTable";

export default function ClassesList() {
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
  const classeStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_STORE
  );
  const classeList = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des classes (Redux store)
  const fetchClassesQuery = useFetchClassesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchClassesQueryData = fetchClassesQuery.data?.data;
  const isLoading = fetchClassesQuery.isLoading;
  const classes = Array.isArray(fetchClassesQueryData)
    ? fetchClassesQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un classe
  const onCreateClick = () => {
    dispatch(openClasseCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-6">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.LIST_STUDENT}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(classes) ? (
                classes.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="col-6 text-end">
          {classeStore && (
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
                  <p>{strings.TOOLTIPS.ADD_STUDENT}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="mt-2">{classeList && <ClasseDataTable />}</div>
      {/* <CreationClasseDialog /> */}
    </>
  );
}
