/* eslint-disable react-hooks/exhaustive-deps */
import { SeanceShowModel } from "@/@types/Seance/Seance";
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
import { useFetchSeanceByIdQuery } from "@/services/seance";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { CircleUser, Loader2, SquareUser, X } from "lucide-react";
import { useEffect } from "react";

const ShowSeanceDialog = ({ seanceUuid }: { seanceUuid: string }) => {
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
                <table className="border-collapse border border-slate-400 ">
                  ici les Qr codes
                </table>{" "}
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
