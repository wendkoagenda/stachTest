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
import {
  closeSeanceShowDialog,
  openAgentApprouveDialog,
  openStudentApprouveDialog,
  openTeacherApprouveDialog,
  setTempSeanceUuid,
} from "@/redux/slices/seanceSlice";
import {
  useFetchAgentQrSVGQuery,
  useFetchSeanceByIdQuery,
  useFetchStudentQrSVGQuery,
  useFetchTeacherQrSVGQuery,
} from "@/services/seance";
import { dateFormater } from "@/utils/functions/dateFormater";
import { svgParcer } from "@/utils/functions/svgParcer";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { CircleUser, Loader2, QrCode, SquareUser, X } from "lucide-react";
import { useEffect } from "react";
import AgentApprouveDialog from "../approuvement/agent/AgentApprouveDialog";
import StudentApprouveDialog from "../approuvement/student/StudentApprouveDialog";
import TeacherApprouveDialog from "../approuvement/teacher/TeacherApprouveDialog";

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
  const permissions = loadPermissions();
  //Liste des permissions requises
  const seanceShow = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // const tempSeanceUuid = useAppSelector(
  //   (state) => state.seances.tempSeanceUuid
  // ); // Utiliser pour seanceUuid soit disponible meme quand ya rafraichissement du composant
  const tempSeanceUuid =
    localStorage.getItem("__tempjodsyfogfwtr7celygfeeckhb87d") ?? "";
  // const seanceUuidValue = seanceUuid !== null ? seanceUuid : tempSeanceUuid;

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showSeanceDialogOpen = useAppSelector(
    (state) => state.seances.showSeanceDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un seances
  const seanceShowModel: SeanceShowModel = {
    seanceUuid: tempSeanceUuid,
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
  const getAgentQrSVGModel: GetQrSVGModel = {
    fileName: data?.data?.agent_qr,
    access_token: access_token,
  };
  const getTeacherQrSVGModel: GetQrSVGModel = {
    fileName: data?.data?.teacher_qr,
    access_token: access_token,
  };
  const getStudentQrSVGModel: GetQrSVGModel = {
    fileName: data?.data?.student_qr,
    access_token: access_token,
  };

  const fetchAgentQrSVGQuery = useFetchAgentQrSVGQuery(getAgentQrSVGModel);
  const agentQr = fetchAgentQrSVGQuery;
  const fetchTeacherQrSVGQuery =
    useFetchTeacherQrSVGQuery(getTeacherQrSVGModel);
  const teacherQr = fetchTeacherQrSVGQuery;

  const fetchStudentQrSVGQuery =
    useFetchStudentQrSVGQuery(getStudentQrSVGModel);
  const studentQr = fetchStudentQrSVGQuery;

  const isAgentQrLoading = fetchAgentQrSVGQuery.isFetching;
  const isTeacherQrLoading = fetchTeacherQrSVGQuery.isFetching;
  const isStudentQrLoading = fetchStudentQrSVGQuery.isFetching;
  // Agent approuve
  const handleAgentApprove = () => {
    dispatch(openAgentApprouveDialog());
  };
  const handleTeacherApprove = () => {
    dispatch(openTeacherApprouveDialog());
  };
  const handleStudentApprove = () => {
    dispatch(setTempSeanceUuid(seanceUuid));
    dispatch(openStudentApprouveDialog());
  };

  return (
    <>
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
                      {isAgentQrLoading ? (
                        "Chargement ..."
                      ) : data?.data?.agent_qr === null ? (
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
                        <div>
                          <div className="flex items-center justify-center ">
                            {svgParcer(agentQr?.data?.svgData)}
                          </div>
                          <div>
                            {data?.data?.agent_qr_created_at
                              ? dateFormater(data?.data?.agent_qr_created_at)
                              : "Date non disponible"}{" "}
                            <br />
                            {strings.TEXTS.VISA_AGENT}
                          </div>
                        </div>
                      )}
                      {isTeacherQrLoading ? (
                        "Chargement ..."
                      ) : data?.data?.teacher_qr === null ? (
                        <div>
                          <div className="w-32 h-32 bg-gray-400 flex items-center justify-center ">
                            {parseInt(t_id) != 0 ? (
                              <Button
                                variant="ghost"
                                onClick={handleTeacherApprove}
                              >
                                <QrCode />
                              </Button>
                            ) : (
                              <Button variant="ghost" disabled>
                                <QrCode />
                              </Button>
                            )}
                          </div>
                          <div>{strings.TEXTS.VISA_TEACHER}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-center ">
                            {svgParcer(teacherQr?.data?.svgData)}
                          </div>
                          <div>
                            {data?.data?.teacher_qr_created_at
                              ? dateFormater(data?.data?.teacher_qr_created_at)
                              : "Date non disponible"}{" "}
                            <br />
                            {strings.TEXTS.VISA_TEACHER}
                          </div>
                        </div>
                      )}

                      {isStudentQrLoading ? (
                        "Chargement ..."
                      ) : data?.data?.student_qr === null ? (
                        <div>
                          <div className="w-32 h-32 bg-gray-400 flex items-center justify-center ">
                            {parseInt(s_id) != 0 ? (
                              <Button
                                variant="ghost"
                                onClick={handleStudentApprove}
                              >
                                <QrCode />
                              </Button>
                            ) : (
                              <Button variant="ghost" disabled>
                                <QrCode />
                              </Button>
                            )}
                          </div>
                          <div>{strings.TEXTS.VISA_STUDENT}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center justify-center ">
                            {svgParcer(studentQr?.data?.svgData)}
                          </div>
                          <div>
                            {data?.data?.student_qr_created_at
                              ? dateFormater(data?.data?.student_qr_created_at)
                              : "Date non disponible"}{" "}
                            <br />
                            {strings.TEXTS.VISA_STUDENT}
                          </div>
                        </div>
                      )}
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
      <AgentApprouveDialog seanceId={data?.data?.id} />
      <StudentApprouveDialog seanceId={data?.data?.id} />
      <TeacherApprouveDialog seanceId={data?.data?.id} />
    </>
  );
};

export default ShowSeanceDialog;
