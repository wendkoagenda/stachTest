import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeTeacherUpdateDialog } from "@/redux/slices/teacherSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateTeacherForm from "./UpdateTeacherForm";

const UpdateTeacherDialog = ({ teacherUuid }: { teacherUuid: string }) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updatingTeacherDialogOpen = useAppSelector(
    (state) => state.teachers.updatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeTeacherUpdateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updatingTeacherDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_TEACHER}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_TEACHER}
          </DialogDescription>
        </DialogHeader>
        <UpdateTeacherForm teacherUuid={teacherUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateTeacherDialog;
