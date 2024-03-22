import { StudentAllowUpdateModel } from "@/@types/Module/Module";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import {
  closeStudentAllowUpdateDialog,
  refreshModuleList,
} from "@/redux/slices/moduleSlice";
import { refreshSeanceList } from "@/redux/slices/seanceSlice";
import { useUpdateStudentAllowMutation } from "@/services/module";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { CheckCircle2, Loader2, SaveIcon, X } from "lucide-react";

const UpdateStudentAllowDialog = ({
  dcnfsum_id,
}: {
  dcnfsum_id: number | undefined;
}) => {
  //*******************Déclaration des Hooks

  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const studentAllowUpdatingDialogOpen = useAppSelector(
    (state) => state.modules.studentAllowUpdatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeStudentAllowUpdateDialog());
  };
  //*******************Fin
  // Variable de type fonction pour l'affichage de notification de type Toast
  const { openNotification } = NotificationToast();
  //*******************Fin
  const [updateStdentAllow, { error, isLoading }] =
    useUpdateStudentAllowMutation();

  const studentAllowUpdateModel: StudentAllowUpdateModel = {
    dcnfsum_id: dcnfsum_id,
    access_token: access_token,
  };

  const handleUpdateStuentAllow = async () => {
    await updateStdentAllow(studentAllowUpdateModel).unwrap();
    dispatch(refreshSeanceList());
    dispatch(refreshModuleList());
    dispatch(closeStudentAllowUpdateDialog());
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };
  return (
    <Dialog open={studentAllowUpdatingDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[500px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.STUDENT_ALLOW}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.STUDENT_ALLOW}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-end">
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.SAVING}
            </Button>
          ) : (
            <Button onClick={handleUpdateStuentAllow}>
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
export default UpdateStudentAllowDialog;
