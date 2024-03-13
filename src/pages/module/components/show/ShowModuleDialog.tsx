/* eslint-disable react-hooks/exhaustive-deps */
import { ModuleShowModel } from "@/@types/Module/Module";
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
import { closeModuleShowDialog } from "@/redux/slices/moduleSlice";
import { useFetchModuleByIdQuery } from "@/services/module";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { Clock, Info, Loader2, Plus, X } from "lucide-react";
import { useEffect } from "react";

const ShowModuleDialog = ({ moduleUuid }: { moduleUuid: string }) => {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const decodedToken = usePermissions();
  //Liste des permissions requises
  const moduleShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.MODULE_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showModuleDialogOpen = useAppSelector(
    (state) => state.modules.showModuleDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const moduleShowModel: ModuleShowModel = {
    moduleUuid: moduleUuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un module (RTK)
  const fetchModuleByIdQuery = useFetchModuleByIdQuery(moduleShowModel);

  // Récupération des détails de l'module au montage du composant
  useEffect(() => {
    fetchModuleByIdQuery.refetch();
  }, [showModuleDialogOpen]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchModuleByIdQuery.data;
  const isLoading = fetchModuleByIdQuery.isFetching;

  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeModuleShowDialog());
  };

  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin

  return (
    <Dialog open={showModuleDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_MODULE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.SHOW_MODULE}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            {moduleShow && (
              <>
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
                      onClick={() => copyToClipboard(data?.data?.title)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.ACRONYM}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() => copyToClipboard(data?.data?.acronym)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.acronym}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.CODE}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() => copyToClipboard(data?.data?.code)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.code}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.CREDIT}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.credits.toString())
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.credits}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.COEF}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.coef.toString())
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.coef}
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
                        copyToClipboard(data?.data?.vh_cm.toString())
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.vh_cm} {strings.TEXTS.HEURES}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.VH_TD}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.vh_td.toString())
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.vh_td} {strings.TEXTS.HEURES}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.VH_TP}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.vh_tp.toString())
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.vh_tp} {strings.TEXTS.HEURES}
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
                            (data?.data?.vh_tp ?? 0) +
                            (data?.data?.vh_td ?? 0) +
                            (data?.data?.vh_cm ?? 0)
                          ).toString()
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {(data?.data?.vh_tp ?? 0) +
                        (data?.data?.vh_td ?? 0) +
                        (data?.data?.vh_cm ?? 0)}{" "}
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
                      onClick={() => copyToClipboard(data?.data?.description)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.description}
                    </td>
                  </tr>
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

export default ShowModuleDialog;
