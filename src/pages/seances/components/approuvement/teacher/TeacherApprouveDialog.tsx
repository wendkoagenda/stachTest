import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeTeacherApprouveDialog } from "@/redux/slices/seanceSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import TeacherApprouveForm from "./TeacherApprouveForm";

export default function TeacherApprouveDialog({
  seanceId,
}: {
  seanceId: number | undefined;
}) {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const openTeacherApprouveDialog = useAppSelector(
    (state) => state.seances.teacherApprouveDialog
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeTeacherApprouveDialog());
  };
  //*******************Fin

  return (
    <Dialog open={openTeacherApprouveDialog} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[500px] md:max-h-[500px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.APPROUVE_SEANCE} Teacher</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.APPROUVE_SEANCE}
          </DialogDescription>
        </DialogHeader>
        <TeacherApprouveForm seanceId={seanceId} />
      </DialogContent>
    </Dialog>
  );
}
