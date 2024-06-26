import { UserDeletionModel } from "@/@types/Global/User";
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
import { refreshModuleList } from "@/redux/slices/moduleSlice";
import { closeSeanceDeleteDialog } from "@/redux/slices/seanceSlice";
import {
  useDeleteSeanceMutation,
  useFetchSeancesQuery,
} from "@/services/seance";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Icons } from "@/constants/icons.constant";

const DeleteSeanceDialog = ({ seanceId }: { seanceId: number }) => {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de suppression (Redux Store)
  const deletionSeanceDialogOpen = useAppSelector(
    (state) => state.seances.deletionDialogOpen
  );

  // Hook pour suppression d'un Seance (RTK)
  const [deleteSeance, { isLoading, error }] = useDeleteSeanceMutation();

  // Hook pour récupérer la liste des Seances (RTK)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission de la demande de suppression
  const onDelete = async () => {
    const actorDeletionModel: UserDeletionModel = {
      userId: seanceId,
      access_token: access_token,
    };
    await deleteSeance(actorDeletionModel).unwrap();
    dispatch(closeSeanceDeleteDialog());
    dispatch(refreshModuleList());
    fetchSeancesQuery.refetch();
    console.log("error", error);
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de suppression  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceDeleteDialog());
  };
  //*******************Fin

  return (
    <Dialog open={deletionSeanceDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          <DialogTitle>{strings.TEXTS.DELETE_SEANCE}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="flex flex-row justify-end">
          {isLoading ? (
            <Button disabled variant="destructive">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.DELETING}
            </Button>
          ) : (
            <Button type="submit" onClick={onDelete} variant="destructive">
              <Icons.Delete className="mr-2 h-4 w-4" />
              {strings.BUTTONS.DELETE}
            </Button>
          )}
          <Button onClick={onCloseClick} type="button" variant="secondary">
            <Icons.Cancel className="mr-2 h-4 w-4" />
            {strings.BUTTONS.CANCEL}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteSeanceDialog;
