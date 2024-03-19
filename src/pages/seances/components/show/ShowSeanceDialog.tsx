/* eslint-disable react-hooks/exhaustive-deps */
import { GetQrSVGModel, SeanceShowModel } from "@/@types/Seance/Seance";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
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
import { closeSeanceShowDialog } from "@/redux/slices/seanceSlice";
import {
  useFetchAgentQrSVGQuery,
  useFetchSeanceByIdQuery,
} from "@/services/seance";
import { dateFormater } from "@/utils/functions/dateFormater";
import { svgParcer } from "@/utils/functions/svgParcer";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { CircleUser, Loader2, QrCode, SquareUser, X } from "lucide-react";
import { useEffect } from "react";

const ShowSeanceDialog = ({ seanceUuid }: { seanceUuid: string }) => {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const t_id =
    localStorage.getItem("__tpiwubfacQWDBUR929dkhayfqdjMNg529q8d") ?? "0";
  const s_id =
    localStorage.getItem("__spiecjwvjvQGIWUIEB598156bckeoygqoddq") ?? "0";
  const a_id =
    localStorage.getItem("__albvs26dfbvnuhwf87915515kbcckqacanMM") ?? "0";

  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const decodedToken = usePermissions();
  //Liste des permissions requises
  const seanceShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showSeanceDialogOpen = useAppSelector(
    (state) => state.seances.showSeanceDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un seances
  const seanceShowModel: SeanceShowModel = {
    seanceUuid: seanceUuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un seance (RTK)
  const fetchSeanceByIdQuery = useFetchSeanceByIdQuery(seanceShowModel);

  // Récupération des détails de l'seance au montage du composant
  useEffect(() => {
    fetchSeanceByIdQuery.refetch();
  }, [showSeanceDialogOpen]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchSeanceByIdQuery?.data;
  const isLoading = fetchSeanceByIdQuery.isFetching;

  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeSeanceShowDialog());
  };

  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin
  // Agent qr
  const getQrSVGModel: GetQrSVGModel = {
    fileName: data?.data?.agent_qr,
    access_token: access_token,
  };

  const fetchAgentQrSVGQuery = useFetchAgentQrSVGQuery(getQrSVGModel);
  const agentQr = fetchAgentQrSVGQuery;
  console.log("lll", agentQr);
  const isAgentQrLoading = fetchAgentQrSVGQuery.isFetching;
  // Agent approuve
  const handleAgentApprove = () => {
    alert("o");
  };
  return (
    <Dialog open={showSeanceDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_SEANCE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.SHOW_SEANCE}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            {seanceShow && (
              <>
                <div className="flex flex-row">
                  <Button size="title" style={{ pointerEvents: "none" }}>
                    <SquareUser className="mr-2 h-4 w-4" />
                    {strings.TEXTS.SEANCE_INFO}
                  </Button>
                </div>
                <table className="border-collapse border border-slate-400 ">
                  <tr>
                    <td className="border border-slate-300 ">
                      <b>{strings.TH.TITLE}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() => copyToClipboard(data?.data?.title)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.VH_CM}</b>
                    </td>
                    <td className="border border-slate-300 ">
                      {data?.data?.vh_cm_eff}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.VH_TD}</b>
                    </td>
                    <td className="border border-slate-300 ">
                      {data?.data?.vh_td_eff}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.VH_TP}</b>
                    </td>
                    <td className="border border-slate-300 ">
                      {data?.data?.vh_tp_eff}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.CONTENU}</b>
                    </td>
                    <td className="border border-slate-300 ">
                      {data?.data?.contenu}
                    </td>
                  </tr>
                </table>
                <div className="flex flex-row">
                  <Button size="title" style={{ pointerEvents: "none" }}>
                    <CircleUser className="mr-2 h-4 w-4" />
                    {strings.TEXTS.VALIDATIONS}
                  </Button>
                </div>
                <table className="border-collapse border border-slate-300  ">
                  <div className="grid grid-cols-3 gap-4 justify-items-center  text-center ">
                    {data?.data?.agent_qr === null ? (
                      <div>
                        <div className="w-32 h-32 bg-gray-400 flex items-center justify-center ">
                          {parseInt(a_id) != 0 ? (
                            <Button
                              variant="ghost"
                              onClick={handleAgentApprove}
                            >
                              <QrCode />
                            </Button>
                          ) : (
                            <Button variant="ghost" disabled>
                              <QrCode />
                            </Button>
                          )}
                        </div>
                        <div>{strings.TEXTS.VISA_AGENT}</div>
                      </div>
                    ) : (
                      <>
                        "The Qr"
                        {/* {svgParcer(agentQr?.data?.svgData)} */}
                        {/* <div
                          className="flex items-center justify-center"
                          dangerouslySetInnerHTML={{
                            __html: svgParcer(agentQr?.data?.svgData),
                          }}
                        /> */}
                        {/* {agentQr} */}
                        {/* <div className="flex items-center justify-center">
                          {data?.data?.agent_qr_created_at
                            ? dateFormater(data?.data?.agent_qr_created_at)
                            : "Date non disponible"}
                        </div> */}
                      </>
                    )}
                    <div>
                      <div className="w-32 h-32 bg-gray-400 flex items-center justify-center ">
                        <Button variant="ghost">
                          <QrCode />
                        </Button>
                      </div>
                      <div>{strings.TEXTS.VISA_TEACHER}</div>
                    </div>
                    <div>
                      <div className="w-32 h-32 bg-gray-400 flex items-center justify-center ">
                        <Button variant="ghost">
                          <QrCode />
                        </Button>
                      </div>
                      <div>{strings.TEXTS.VISA_STUDENT}</div>
                    </div>
                  </div>
                </table>
              </>
            )}
          </>
        )}
        <DialogFooter className="flex flex-row justify-end">
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

export default ShowSeanceDialog;
