import { ClasseShowByDCModel } from "@/@types/Classe/Classe";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openClasseCreateDialog } from "@/redux/slices/classeSlice";
import { useFetchClassesByDCUuIdQuery } from "@/services/classe";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import { useEffect } from "react";
import ClasseDataTableByDepartement from "../dataTable/ClasseDataTableByDepartement";

export default function ClassesListByDepartement({
  dc_uuid,
}: {
  dc_uuid: string | undefined;
}) {
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

  // Préparation du paramettre du hook de recuperation des détails d'un students
  const classesByDCShowModel: ClasseShowByDCModel = {
    dc_uuid: dc_uuid,
    access_token: access_token,
  };
  const fetchClassesByDCUuIdQuery =
    useFetchClassesByDCUuIdQuery(classesByDCShowModel);
  dc_uuid;
  // Récupération de la liste des classes au montage du composant
  useEffect(() => {
    fetchClassesByDCUuIdQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchClassesByDCUuIdData = fetchClassesByDCUuIdQuery.data?.data;
  const isLoading = fetchClassesByDCUuIdQuery.isLoading;
  const classes = Array.isArray(fetchClassesByDCUuIdData)
    ? fetchClassesByDCUuIdData
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
            {strings.TEXTS.LIST_CLASSE_OF_DEPARTEMENT}
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
                  <Button onClick={onCreateClick} disabled>
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
                  <p>{strings.TOOLTIPS.NOT_YET_DISPONIBLE}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="mt-2">
        {classeList && <ClasseDataTableByDepartement dc_uuid={dc_uuid} />}
      </div>
      {/* <CreationClasseDialog /> */}
    </>
  );
}
