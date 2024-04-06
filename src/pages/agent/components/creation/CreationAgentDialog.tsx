import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeAgentCreateDialog } from "@/redux/slices/agentSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import CreateAgentForm from "./CreateAgentForm";

export default function CreationAgentDialog() {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de création(Redux Store)
  const creationAgentDialogOpen = useAppSelector(
    (state) => state.agents.creationDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de création  (Redux store)
  const onCloseClick = () => {
    dispatch(closeAgentCreateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={creationAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ADD_AGENT}</DialogTitle>
        </DialogHeader>
        <CreateAgentForm />
      </DialogContent>
    </Dialog>
  );
}
