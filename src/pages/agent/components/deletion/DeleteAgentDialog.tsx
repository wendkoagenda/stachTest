import { ActorDeletionModel } from "@/@types/ActorDeletionModel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import strings from "@/constants/strings.constant";
import { closeAgentDeleteDialog } from "@/redux/slices/agentSlice";
import { useDeleteAgentMutation, useFetchAgentsQuery } from "@/services/agent";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { NotificationToast } from "@/utils/functions/openNotificationToast";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";

import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CheckCircle2, Loader2, Trash2, X } from "lucide-react";

const DeleteAgentDialog = ({ agentId }: { agentId: number }) => {
  // Var dispatch hook
  const dispatch = useAppDispatch();
  // Dialog open/close state
  const deletionAgentDialogOpen = useAppSelector(
    (state) => state.agents.deletionDialogOpen
  );

  const onCloseClick = () => {
    dispatch(closeAgentDeleteDialog());
  };
  const { openNotification } = NotificationToast();
  const access_token: string =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ||
    "access_token";
  const [deleteAgent, { isLoading, error }] = useDeleteAgentMutation();
  const fetchAgentsQuery = useFetchAgentsQuery(access_token);

  const onDelete = async () => {
    const actorDeletionModel: ActorDeletionModel = {
      actorId: agentId,
      access_token: access_token,
    };
    console.log("agentIdsss", actorDeletionModel.actorId);
    await deleteAgent(actorDeletionModel).unwrap();
    dispatch(closeAgentDeleteDialog());
    fetchAgentsQuery.refetch();
    console.log("error", error);
    openNotification(
      undefined,
      <div className="flex flex-row text-green-600">
        <CheckCircle2 className="mr-2 h-4 w-4" />{" "}
        {strings.MESSAGES.SUCCESS_ACTION}
      </div>
    );
  };

  return (
    <Dialog open={deletionAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          {error
            ? "status" in error
              ? renderFetchBaseQueryError(error as FetchBaseQueryError)
              : renderSerializedError(error as SerializedError)
            : " "}
          <DialogTitle>{strings.TEXTS.DELETE_AGENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.DELETE_AGENT}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isLoading ? (
            <Button disabled variant="destructive">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.DELETEING}
            </Button>
          ) : (
            <Button type="submit" onClick={onDelete} variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              {strings.BUTTONS.DELETE}
            </Button>
          )}
          <Button onClick={onCloseClick} type="button" variant="secondary">
            <X className="mr-2 h-4 w-4" />
            {strings.BUTTONS.CANCEL}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAgentDialog;
