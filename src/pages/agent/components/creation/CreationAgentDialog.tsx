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
  // Var dispatch hook
  const dispatch = useAppDispatch();
  // Dialog open/close state
  const creationAgentDialogOpen = useAppSelector(
    (state) => state.agents.creationDialogOpen
  );

  const onCloseClick = () => {
    dispatch(closeAgentCreateDialog());
  };

  return (
    <Dialog open={creationAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.ADD_AGENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_AGENT}
          </DialogDescription>
        </DialogHeader>
        <CreateAgentForm />
      </DialogContent>
    </Dialog>
  );
}
