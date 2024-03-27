import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeAgentUpdateDialog } from "@/redux/slices/agentSlice";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import UpdateAgentForm from "./UpdateAgentForm";

const UpdateAgentDialog = ({ agentUuid }: { agentUuid: string }) => {
  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du formulaire de mise à jour (Redux Store)
  const updatingAgentDialogOpen = useAppSelector(
    (state) => state.agents.updatingDialogOpen
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du formulaire de mise à jour  (Redux store)
  const onCloseClick = () => {
    dispatch(closeAgentUpdateDialog());
  };
  //*******************Fin

  return (
    <Dialog open={updatingAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_AGENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.UPDATED_AGENT}
          </DialogDescription>
        </DialogHeader>
        <UpdateAgentForm agentUuid={agentUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateAgentDialog;
