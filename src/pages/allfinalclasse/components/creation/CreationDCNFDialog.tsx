import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeDCNFCreateDialog } from "@/redux/slices/classeSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";

export default function CreationDCNFDialog() {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const creationDcnfDialogOpen = useAppSelector(
    (state) => state.classes.dcnfCreationDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeDCNFCreateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={creationDcnfDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ADD_MODULE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_MODULE}
          </DialogDescription>
        </DialogHeader>
        En suspend , il reste le formulaire d'envoie
        {/* <CreateDCNFForm /> */}
      </DialogContent>
    </Dialog>
  );
}
