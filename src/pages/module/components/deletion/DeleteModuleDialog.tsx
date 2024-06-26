import { ModuleDeletionModel } from "@/@types/Module/Module";
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
import { closeModuleDeleteDialog } from "@/redux/slices/moduleSlice";
import {
  useDeleteModuleMutation,
  useFetchModulesQuery,
} from "@/services/module";
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
import { Icons } from "@/constants/icons.constant";

const DeleteModuleDialog = ({ moduleId }: { moduleId: number }) => {
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
  const deletionModuleDialogOpen = useAppSelector(
    (state) => state.modules.deletionDialogOpen
  );

  // Hook pour suppression d'un Module (RTK)
  const [deleteModule, { isLoading, error }] = useDeleteModuleMutation();

  // Hook pour récupérer la liste des Modules (RTK)
  const fetchModulesQuery = useFetchModulesQuery(access_token);
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const moduleDestroy = permissions.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_DESTROY
  );
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de soumission de la demande de suppression
  const onDelete = async () => {
    const moduleDeletionModel: ModuleDeletionModel = {
      moduleId: moduleId,
      access_token: access_token,
    };
    await deleteModule(moduleDeletionModel).unwrap();
    dispatch(closeModuleDeleteDialog());
    fetchModulesQuery.refetch();
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
    dispatch(closeModuleDeleteDialog());
  };
  //*******************Fin

  return (
    <Dialog open={deletionModuleDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          <DialogTitle>{strings.TEXTS.DELETE_MODULE}</DialogTitle>
        </DialogHeader>
        {moduleDestroy && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModuleDialog;
