import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeModuleUpdateDialog } from "@/redux/slices/moduleSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateModuleForm from "./UpdateModuleForm";

const UpdateModuleDialog = ({ moduleUuid }: { moduleUuid: string }) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updatingModuleDialogOpen = useAppSelector(
    (state) => state.modules.updatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeModuleUpdateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updatingModuleDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[700px] md:overflow">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_MODULE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.UPDATED_MODULE}
          </DialogDescription>
        </DialogHeader>
        <UpdateModuleForm moduleUuid={moduleUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateModuleDialog;
