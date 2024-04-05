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
import { closeTeacherDeleteDialog } from "@/redux/slices/teacherSlice";
import {
  useDeleteTeacherMutation,
  useFetchTeachersQuery,
} from "@/services/teacher";
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

const DeleteTeacherDialog = ({ teacherId }: { teacherId: number }) => {
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
  const deletionTeacherDialogOpen = useAppSelector(
    (state) => state.teachers.deletionDialogOpen
  );

  // Hook pour suppression d'un Teacher (RTK)
  const [deleteTeacher, { isLoading, error }] = useDeleteTeacherMutation();

  // Hook pour récupérer la liste des Teachers (RTK)
  const fetchTeachersQuery = useFetchTeachersQuery(access_token);
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const teacherDestroy = permissions.userPermissions.includes(
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
    const actorDeletionModel: UserDeletionModel = {
      userId: teacherId,
      access_token: access_token,
    };
    await deleteTeacher(actorDeletionModel).unwrap();
    dispatch(closeTeacherDeleteDialog());
    fetchTeachersQuery.refetch();
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
    dispatch(closeTeacherDeleteDialog());
  };
  //*******************Fin

  return (
    <Dialog open={deletionTeacherDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          <DialogTitle>{strings.TEXTS.DELETE_TEACHER}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.DELETE_TEACHER}
          </DialogDescription>
        </DialogHeader>
        {teacherDestroy && (
          <DialogFooter className="flex flex-row justify-end">
            {isLoading ? (
              <Button disabled variant="destructive">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {strings.BUTTONS.DELETING}
              </Button>
            ) : (
              <Button type="submit" onClick={onDelete} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
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

export default DeleteTeacherDialog;
