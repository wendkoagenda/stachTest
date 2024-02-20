/* eslint-disable react-hooks/exhaustive-deps */
import { ActorShowModel } from "@/@types/ActorShowModel";
import TableSkeleton from "@/components/custom/TableSkeleton";
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
import { closeAgentShowDialog } from "@/redux/slices/agentSlice";
import { useFetchAgentByIdQuery } from "@/services/agent";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { CircleUser, Loader2, SquareUser, X } from "lucide-react";
import { useEffect } from "react";

const ShowAgentDialog = ({ agentUuid }: { agentUuid: string }) => {
  // Var dispatch hook
  const dispatch = useAppDispatch();
  // Dialog open/close state
  const showAgentDialogOpen = useAppSelector(
    (state) => state.agents.showAgentDialogOpen
  );

  const access_token: string =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ||
    "access_token";

  const onCloseClick = () => {
    dispatch(closeAgentShowDialog());
  };
  const actorShowModel: ActorShowModel = {
    actorUuid: agentUuid,
    access_token: access_token,
  };

  const fetchAgentByIdQuery = useFetchAgentByIdQuery(actorShowModel);

  useEffect(() => {
    fetchAgentByIdQuery.refetch;
  }, []);

  const data = fetchAgentByIdQuery.data;
  const isLoading = fetchAgentByIdQuery.isFetching;
  console.log("isLoading show:", isLoading);

  // console.log("Agent show :", data?.data.);

  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };

  return (
    <Dialog open={showAgentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_AGENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.SHOW_AGENT}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="flex flex-row">
              <Button size="title" style={{ pointerEvents: "none" }}>
                <SquareUser className="mr-2 h-4 w-4" />
                Information sur l'agent
              </Button>
            </div>
            <table className="border-collapse border border-slate-400 ">
              <tr>
                <td className="border border-slate-300 ">
                  <b>{strings.TH.TITLE}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.agent?.title)}
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.agent?.title}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.BANNER}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.agent?.banner)}
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.agent?.banner}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.REGISTRATION_NO}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() =>
                    copyToClipboard(data?.data?.agent?.registration_number)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.agent?.registration_number}
                </td>
              </tr>
            </table>
            <div className="flex flex-row">
              <Button size="title" style={{ pointerEvents: "none" }}>
                <CircleUser className="mr-2 h-4 w-4" />
                Information sur la personne
              </Button>
            </div>
            <table className="border-collapse border border-slate-400 ">
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.LAST_NAME}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.user?.last_name)}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  {data?.data?.user?.last_name}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.FIRST_NAME}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.user?.first_name)}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  {data?.data?.user?.first_name}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.EMAIL}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.user?.email)}
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.user?.email}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.PHONE1}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.user?.phone1)}
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.user?.phone1}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.PHONE2}</b>
                </td>
                <td
                  className="border border-slate-300 "
                  onClick={() => copyToClipboard(data?.data?.user?.phone2)}
                  style={{ cursor: "pointer" }}
                >
                  {data?.data?.user?.phone2}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.GENDER}</b>
                </td>
                <td className="border border-slate-300 ">
                  {data?.data?.user?.gender}
                </td>
              </tr>
              <tr>
                <td className="border border-slate-300">
                  <b>{strings.TH.STATUS}</b>
                </td>
                <td className="border border-slate-300 ">
                  {data?.data?.user?.is_active}
                </td>
              </tr>
            </table>
          </>
        )}
        <DialogFooter>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {strings.BUTTONS.CLOSE}
            </Button>
          ) : (
            <Button type="submit" onClick={onCloseClick}>
              <X className="mr-2 h-4 w-4" />
              {strings.BUTTONS.OK_CLOSE}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowAgentDialog;
