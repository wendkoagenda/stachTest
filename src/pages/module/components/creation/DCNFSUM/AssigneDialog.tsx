import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeAssigneDialog } from "@/redux/slices/moduleSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import AssigneForm from "./AssigneForm";

export default function AssigneDialog({
  dcnfsum_id,
}: {
  dcnfsum_id: number | undefined;
}) {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const openAssigneDialogOpen = useAppSelector(
    (state) => state.modules.assigneDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeAssigneDialog());
  };
  //*******************Fin

  return (
    <Dialog open={openAssigneDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[500px] md:max-h-[500px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ASSIGNE_TO_PROF}</DialogTitle>
        </DialogHeader>
        <AssigneForm dcnfsum_id={dcnfsum_id} />
      </DialogContent>
    </Dialog>
  );
}
