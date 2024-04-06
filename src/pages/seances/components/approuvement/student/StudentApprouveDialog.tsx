import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeStudentApprouveDialog } from "@/redux/slices/seanceSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import AgentApprouveForm from "./StudentApprouveForm";

export default function StudentApprouveDialog({
  seanceId,
}: {
  seanceId: number | undefined;
}) {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const openStudentApprouveDialog = useAppSelector(
    (state) => state.seances.studentApprouveDialog
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeStudentApprouveDialog());
  };
  //*******************Fin

  return (
    <Dialog open={openStudentApprouveDialog} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[500px] md:max-h-[500px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.APPROUVE_SEANCE} Student</DialogTitle>
        </DialogHeader>
        <AgentApprouveForm seanceId={seanceId} />
      </DialogContent>
    </Dialog>
  );
}
