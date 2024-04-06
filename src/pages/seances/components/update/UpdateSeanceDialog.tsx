import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeSeanceUpdateDialog } from "@/redux/slices/seanceSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateSeanceForm from "./UpdateSeanceForm";

const UpdateSeanceDialog = ({ seanceUuid }: { seanceUuid: string }) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updatingSeanceDialogOpen = useAppSelector(
    (state) => state.seances.updatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceUpdateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updatingSeanceDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_SEANCE}</DialogTitle>
        </DialogHeader>
        <UpdateSeanceForm seanceUuid={seanceUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateSeanceDialog;
