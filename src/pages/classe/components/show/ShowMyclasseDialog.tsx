/* eslint-disable react-hooks/exhaustive-deps */
import { ClasseShowModel } from "@/@types/Classe/Classe";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import {
  closeClasseShowDialog,
  closeMycClasseShowDialog,
  closeMyclasseShowDialog,
} from "@/redux/slices/classeSlice";
import { useFetchClasseByIdQuery } from "@/services/classe";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { ArrowUpRightFromSquare, Loader2, X } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyClassesShowByDCNFModel } from "@/@types/Singles/Dcnfsumt";
import { useFetchMyClasseDetailsQuery } from "@/services/module";
import MymodulesListxByDCNF from "@/pages/module/MymodulesListByDCNF";
import MymodulesListByDCNF from "@/pages/module/MymodulesListByDCNF";
import { Icons } from "@/constants/icons.constant";

const ShowMyclasseDialog = ({ dcnf_id }: { dcnf_id: number }) => {
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
  const classeShow = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de navigation
  const navigate = useNavigate();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showMyclasseDialogOpen = useAppSelector(
    (state) => state.classes.showMyclasseDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const myclasseShowModel: MyClassesShowByDCNFModel = {
    dcnf_id: dcnf_id,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchMyClasseByDCNFQuery =
    useFetchMyClasseDetailsQuery(myclasseShowModel);

  // Récupération des détails de l'classe au montage du composant
  useEffect(() => {
    fetchMyClasseByDCNFQuery.refetch();
  }, [showMyclasseDialogOpen]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchMyClasseByDCNFQuery.data?.data;
  const isLoading = fetchMyClasseByDCNFQuery.isFetching;
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeMyclasseShowDialog());
  };
  // Fonction de navigation vers nouvelle page de details
  const onShowMoreClick = (
    dcnf_uuid: string | undefined,
    dcnf_id: number | undefined
  ) => {
    navigate(`/classe/${dcnf_uuid}/${dcnf_id}`);
    dispatch(closeClasseShowDialog());
  };
  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin

  return (
    <Dialog open={showMyclasseDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_CLASSE}</DialogTitle>
        </DialogHeader>
        <MymodulesListByDCNF dcnf_id={dcnf_id} />
        <DialogFooter className="flex flex-row justify-end">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.CLOSE}
            </Button>
          ) : (
            <Button type="submit" onClick={onCloseClick}>
              <Icons.Cancel className="mr-2 h-4 w-4" />
              {strings.BUTTONS.OK_CLOSE}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowMyclasseDialog;
