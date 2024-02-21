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
  // Var dispatch hook
  const dispatch = useAppDispatch();
  // Dialog open/close state
  const updatingAgentDialogOpen = useAppSelector(
    (state) => state.agents.updatingDialogOpen
  );

  const onCloseClick = () => {
    dispatch(closeAgentUpdateDialog());
  };

  return (
    <Dialog open={updatingAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.UPDATE_AGENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.ADD_AGENT}
          </DialogDescription>
        </DialogHeader>
        <UpdateAgentForm agentUuid={agentUuid} />
      </DialogContent>
    </Dialog>
  );
};
export default UpdateAgentDialog;
