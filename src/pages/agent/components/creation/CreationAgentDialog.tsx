import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import strings from "@/constants/strings.constant";
import { RootState } from "@/redux/RootState";
import { closeAgentCreateDialog } from "@/redux/slices/agentSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateAgentForm from "./CreateAgentForm";

export default function CreationAgentDialog() {
  // Var dispatch hook
  const dispatch = useDispatch();
  // Dialog open/close state
  const creationAgentDialogOpen = useSelector(
    (state: RootState) => state.agents.creationDialogOpen
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
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div> */}
        <CreateAgentForm />
      </DialogContent>
    </Dialog>
  );
}
