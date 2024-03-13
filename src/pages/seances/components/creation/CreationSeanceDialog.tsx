import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeSeanceCreateDialog } from "@/redux/slices/seanceSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import CreateSeanceForm from "./CreateSeanceForm";

export default function CreationSeanceDialog() {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const creationSeanceDialogOpen = useAppSelector(
    (state) => state.seances.creationDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceCreateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={creationSeanceDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ADD_SEANCE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_SEANCE}
          </DialogDescription>
        </DialogHeader>
        <CreateSeanceForm />
      </DialogContent>
    </Dialog>
  );
}
