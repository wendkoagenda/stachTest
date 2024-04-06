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
import { useEffect, useState } from "react";
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

  //Liste des permissions requises
  const [dcnfShow, setDCNFShow] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCNFShow(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_SHOW)
      );
    }
  }, []);

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

  return (
    <>
      <div className="md:grid md:grid-cols-1 md:gap-4 grid grid-cols-1 gap-1">
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
      <div className="mt-2">
        {dcnfShow && <ClasseDataTableByDepartement dc_uuid={dc_uuid} />}
      </div>
      {/* <CreationClasseDialog /> */}
    </>
  );
}
