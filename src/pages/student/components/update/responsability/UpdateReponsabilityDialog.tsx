import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeReponsabilityDialog } from "@/redux/slices/studentSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateResponsabilityForm from "./UpdateResponsabilityForm";

const UpdateReponsabilityDialog = ({
  studentId,
  studentUuid,
}: {
  studentId: number;
  studentUuid: string;
}) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updateReponsabilityDialogOpen = useAppSelector(
    (state) => state.students.reponsabilityDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeReponsabilityDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updateReponsabilityDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.RESPONSABILITY}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_STUDENT}
          </DialogDescription>
        </DialogHeader>
        <UpdateResponsabilityForm
          studentId={studentId}
          studentUuid={studentUuid}
        />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateReponsabilityDialog;
