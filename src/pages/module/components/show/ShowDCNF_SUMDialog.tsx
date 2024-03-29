/* eslint-disable react-hooks/exhaustive-deps */
import { DCNFSUMShowModel, ModuleTeacherModel } from "@/@types/Module/Module";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  closeModuleShowDialog,
  initialiseRefreshModuleList,
  openAssigneDialog,
} from "@/redux/slices/moduleSlice";

import { SeancesShowByDCNFSUMModel } from "@/@types/Seance/Seance";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import SeanceDataTableByDCNFSUM from "@/pages/seances/components/SeanceDataTableByDCNFSUM";
import ShowTeacherDialog from "@/pages/teacher/components/show";
import { openTeacherShowDialog } from "@/redux/slices/teacherSlice";
import {
  useFetchDCNFSUMByIdQuery,
  useFetchModuleTeacherQuery,
} from "@/services/module";
import { useFetchSeancesByDCNFSUMQuery } from "@/services/seance";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { Cable, Clock, Info, Loader2, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import AssigneDialog from "../creation/DCNFSUM/AssigneDialog";
import UpdateStudentAllowDialog from "../update/UpdateStudentAllowDialog";

const ShowDCNF_SUMDialog = ({
  dcnfsum_uuid,
  dcnf_sum_id,
}: {
  dcnfsum_uuid: string;
  dcnf_sum_id: number;
}) => {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Fin
  const refreshModuleList = useAppSelector(
    (state) => state.modules.refreshModuleList
  );

  const [refreshModuleListLocal, setRefreshModuleListLocal] = useState(false);

  useEffect(() => {
    setRefreshModuleListLocal(refreshModuleList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshModuleList]);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showModuleDialogOpen = useAppSelector(
    (state) => state.modules.showModuleDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const DCNFSUMShowModel: DCNFSUMShowModel = {
    dcnfsum_uuid: dcnfsum_uuid,
    access_token: access_token,
  };
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const seancesShowByDCNFSUMModel: SeancesShowByDCNFSUMModel = {
    dcnfsum_id: dcnf_sum_id,
    access_token: access_token,
  };
  const moduleTeacherModel: ModuleTeacherModel = {
    dcnfsum_id: dcnf_sum_id,
    access_token: access_token,
  };
  // Hook de récupération des détails d'un module (RTK)
  const fetchDCNFSUMByIdQuery = useFetchDCNFSUMByIdQuery(DCNFSUMShowModel);

  const fetchModuleTeacherQuery =
    useFetchModuleTeacherQuery(moduleTeacherModel);
  //Hook de récupération de la liste des seances (Redux store)
  const fetchSeancesByDCNFSUMQuery = useFetchSeancesByDCNFSUMQuery(
    seancesShowByDCNFSUMModel
  );
  // Récupération des détails de l'module au montage du composant
  useEffect(() => {
    fetchDCNFSUMByIdQuery.refetch();
    fetchSeancesByDCNFSUMQuery.refetch();
    fetchModuleTeacherQuery.refetch();
    moduleTeacher;
    dispatch(initialiseRefreshModuleList());
  }, [showModuleDialogOpen, refreshModuleListLocal]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchDCNFSUMByIdQuery.data;
  const isLoading = fetchDCNFSUMByIdQuery.isFetching;

  // Varibles issue du fectch
  const fetchSeancesByDCNFSUMQueryData = fetchSeancesByDCNFSUMQuery.data?.data;

  const seances = Array.isArray(fetchSeancesByDCNFSUMQueryData)
    ? fetchSeancesByDCNFSUMQueryData
    : [];
  const isSeancesLoading = fetchSeancesByDCNFSUMQuery.isLoading;
  const errorSeances = fetchSeancesByDCNFSUMQuery.error;

  const moduleVhTotalDirect =
    data?.data?.su_m?.module?.vh_cm +
    data?.data?.su_m?.module?.vh_td +
    data?.data?.su_m?.module?.vh_tp;

  const moduleVhTotalEffDirect = seances.reduce((acc, seance) => {
    acc += seance.vh_cm_eff + seance.vh_td_eff + seance.vh_tp_eff;
    return acc;
  }, 0);

  const moduleTeacher = fetchModuleTeacherQuery.data?.data;
  const isTeacherLoading = fetchModuleTeacherQuery.isLoading;

  // Calcul pourcentage
  const getPercentageOf = (moduleVhTotal: number, moduleVhTotalEff: number) => {
    const pourcent = (moduleVhTotalEff * 100) / moduleVhTotal;
    const pourcentFormate = parseFloat(pourcent.toFixed(2));
    return pourcentFormate;
  };
  //*******************Fin
  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeModuleShowDialog());
  };
  const onAssigne = () => {
    dispatch(openAssigneDialog());
  };
  const [teacherUuid, setTeacherUuid] = useState("");

  const onShowModuleTeacher = () => {
    if (moduleTeacher) {
      setTeacherUuid(moduleTeacher.uuid);
      dispatch(openTeacherShowDialog());
    }
  };

  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin

  return (
    <>
      <Dialog open={showModuleDialogOpen} onOpenChange={onCloseClick}>
        <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1500px] md:max-h-[600px] ">
          <DialogHeader>
            <DialogTitle>{strings.TEXTS.SHOW_MODULE}</DialogTitle>
            <DialogDescription>
              {strings.INSTRUCTIONS.SHOW_MODULE}
            </DialogDescription>
          </DialogHeader>
          {isTeacherLoading ? (
            <TableSkeleton />
          ) : (
            <div>
              <p>
                {strings.TEXTS.MODULE_DIPENSED_BY}{" "}
                <Button
                  type="submit"
                  variant="link"
                  onClick={onShowModuleTeacher}
                >
                  <b>
                    {moduleTeacher?.user
                      ? `${moduleTeacher.user.last_name} ${moduleTeacher.user.first_name}`
                      : strings.TEXTS.NOT_YET_ASSIGNED}
                  </b>
                </Button>
              </p>
            </div>
          )}
          {isLoading ? (
            <TableSkeleton />
          ) : (
            <>
              <>
                {isSeancesLoading ? (
                  "...."
                ) : (
                  <>
                    {strings.TH.PROGRESS} :{" "}
                    {getPercentageOf(
                      moduleVhTotalDirect,
                      moduleVhTotalEffDirect
                    )}{" "}
                    % ({moduleVhTotalEffDirect} sur {moduleVhTotalDirect}{" "}
                    heures)
                    <Progress
                      value={getPercentageOf(
                        moduleVhTotalDirect,
                        moduleVhTotalEffDirect
                      )}
                    />
                  </>
                )}
                <b>
                  {strings.TH.SEANCES}
                  {seances[0]?.dcnfsumt?.allow_student_entry === 1 ? (
                    <Badge variant="outline" className=" text-red-600  ml-2">
                      {strings.TEXTS.STUDENT_ALLOW_YES}
                    </Badge>
                  ) : seances[0]?.dcnfsumt?.allow_student_entry === 0 ? (
                    <Badge variant="outline" className=" text-green-600 ml-2">
                      {strings.TEXTS.STUDENT_ALLOW_NON}
                    </Badge>
                  ) : (
                    " "
                  )}
                </b>
                <p>
                  {data?.data?.statut === "notAssigned" ? (
                    <>
                      {strings.TEXTS.NOT_YET_ASSIGNED}
                      <Button type="submit" onClick={onAssigne}>
                        <Cable className="mr-2 h-4 w-4" />
                        {strings.BUTTONS.ASSIGNE_TO_PROF}
                      </Button>
                    </>
                  ) : (
                    <SeanceDataTableByDCNFSUM dcnfsum_id={data?.data?.id} />
                  )}
                </p>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="details">
                    <AccordionTrigger>
                      {strings.TEXTS.SHOW_MODULE}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-row mb-2 mt-2">
                        <Button size="title" style={{ pointerEvents: "none" }}>
                          <Info className="mr-2 h-4 w-4" />
                          {strings.TEXTS.GENERAL_INFO}
                        </Button>
                      </div>
                      <table className="border-collapse border border-slate-400 w-full">
                        <tr>
                          <td className="border border-slate-300 ">
                            <b>{strings.TH.TITLE}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(data?.data?.su_m?.module?.title)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.title}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.ACRONYM}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(data?.data?.su_m?.module?.acronym)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.acronym}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.CODE}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(data?.data?.su_m?.module?.code)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.code}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.CREDIT}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.credits.toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.credits}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.COEF}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.coef.toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.coef}
                          </td>
                        </tr>
                      </table>
                      <div className="flex flex-row mb-2 mt-2">
                        <Button size="title" style={{ pointerEvents: "none" }}>
                          <Clock className="mr-2 h-4 w-4" />
                          {strings.TEXTS.VH}
                        </Button>
                      </div>
                      <table className="border-collapse border border-slate-400 w-full">
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.VH_CM}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.vh_cm.toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.vh_cm}{" "}
                            {strings.TEXTS.HEURES}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.VH_TD}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.vh_td.toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.vh_td}{" "}
                            {strings.TEXTS.HEURES}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.VH_TP}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.vh_tp.toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.vh_tp}{" "}
                            {strings.TEXTS.HEURES}
                          </td>
                        </tr>
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.VHT}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                (
                                  (data?.data?.su_m?.module?.vh_tp ?? 0) +
                                  (data?.data?.su_m?.module?.vh_td ?? 0) +
                                  (data?.data?.su_m?.module?.vh_cm ?? 0)
                                ).toString()
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {(data?.data?.su_m?.module?.vh_tp ?? 0) +
                              (data?.data?.su_m?.module?.vh_td ?? 0) +
                              (data?.data?.su_m?.module?.vh_cm ?? 0)}{" "}
                            {strings.TEXTS.HEURES}
                          </td>
                        </tr>
                      </table>
                      <div className="flex flex-row mb-2 mt-2">
                        <Button size="title" style={{ pointerEvents: "none" }}>
                          <Plus className="mr-2 h-4 w-4" />
                          {strings.TEXTS.PLUS}
                        </Button>
                      </div>
                      <table className="border-collapse border border-slate-400 w-full ">
                        <tr>
                          <td className="border border-slate-300">
                            <b>{strings.TH.DESCRIPTION}</b>
                          </td>
                          <td
                            className="border border-slate-300 "
                            onClick={() =>
                              copyToClipboard(
                                data?.data?.su_m?.module?.description
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {data?.data?.su_m?.module?.description}
                          </td>
                        </tr>
                      </table>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </>
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
      <AssigneDialog dcnfsum_id={data?.data.id} />
      <UpdateStudentAllowDialog dcnfsum_id={data?.data.id} />
      <ShowTeacherDialog teacherUuid={teacherUuid} />
    </>
  );
};

export default ShowDCNF_SUMDialog;
