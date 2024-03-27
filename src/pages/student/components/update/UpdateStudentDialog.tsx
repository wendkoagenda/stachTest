import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeStudentUpdateDialog } from "@/redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateStudentForm from "./UpdateStudentForm";

const UpdateStudentDialog = ({ studentUuid }: { studentUuid: string }) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updatingStudentDialogOpen = useAppSelector(
    (state) => state.students.updatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeStudentUpdateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updatingStudentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_STUDENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.UPDATED_STUDENT}
          </DialogDescription>
        </DialogHeader>
        <UpdateStudentForm studentUuid={studentUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateStudentDialog;
