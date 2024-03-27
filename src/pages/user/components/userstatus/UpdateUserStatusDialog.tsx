import { UpdateUserSatatusModel } from "@/@types/Global/User";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeStatusDialog, refreshAgentList } from "@/redux/slices/agentSlice";
import { refreshStudentList } from "@/redux/slices/studentSlice";
import { refreshTeacherList } from "@/redux/slices/teacherSlice";
import { useUpdateUserStatusMutation } from "@/services/agent";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";

const UpdateUserStatusDialog = ({
  user_id,
  is_active,
}: {
  user_id: number | undefined;
  is_active: number | undefined;
}) => {
  //*******************Déclaration des Hooks

  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const openUserStatusDialog = useAppSelector(
    (state) => state.agents.statusDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeStatusDialog());
  };
  //*******************Fin
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin
  const [updateUserStatus, { error, isLoading }] =
    useUpdateUserStatusMutation();

  const updateUserSatatusModel: UpdateUserSatatusModel = {
    updateStatus: {
      user_id: user_id,
      action: is_active === 1 ? "desactive" : "active",
      motif: "Motif general de test",
    },
    access_token: access_token,
  };

  const handleUpdateStatus = async () => {
    await updateUserStatus(updateUserSatatusModel).unwrap();
    dispatch(refreshAgentList());
    dispatch(refreshTeacherList());
    dispatch(refreshStudentList());
    dispatch(closeStatusDialog());
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };
  return (
    <Dialog open={openUserStatusDialog} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[500px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.CHANGE_STATUS}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.CHANGE_STATUS}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-end">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.SAVING}
            </Button>
          ) : (
            <Button onClick={handleUpdateStatus}>
              <SaveIcon className="mr-2 h-4 w-4" />
              {strings.BUTTONS.YES_CHANGE}
            </Button>
          )}
          <Button onClick={onCloseClick} type="button" variant="secondary">
            <X className="mr-2 h-4 w-4" />
            {strings.BUTTONS.CANCEL}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UpdateUserStatusDialog;
