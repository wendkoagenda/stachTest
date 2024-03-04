import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeModuleCreateDialog } from "@/redux/slices/moduleSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import CreateModuleForm from "./CreateModuleForm";

export default function CreationModuleDialog() {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const creationModuleDialogOpen = useAppSelector(
    (state) => state.modules.creationDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeModuleCreateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={creationModuleDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ADD_MODULE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_MODULE}
          </DialogDescription>
        </DialogHeader>
        <CreateModuleForm />
      </DialogContent>
    </Dialog>
  );
}
