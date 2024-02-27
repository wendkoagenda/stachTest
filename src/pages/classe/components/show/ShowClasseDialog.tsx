/* eslint-disable react-hooks/exhaustive-deps */
import { UserShowModel } from "@/@types/Global/User";
import TableSkeleton from "@/components/custom/TableSkeleton";
import { Badge } from "@/components/ui/badge";
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
import { closeClasseShowDialog } from "@/redux/slices/classeSlice";
import { useFetchClasseByIdQuery } from "@/services/classe";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { CircleUser, Loader2, SquareUser, X } from "lucide-react";
import { useEffect } from "react";

const ShowClasseDialog = ({ classeUuid }: { classeUuid: string }) => {
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
  const classeShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showClasseDialogOpen = useAppSelector(
    (state) => state.classes.showClasseDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const actorShowModel: UserShowModel = {
    userUuid: classeUuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchClasseByIdQuery = useFetchClasseByIdQuery(actorShowModel);

  // Récupération des détails de l'classe au montage du composant
  useEffect(() => {
    fetchClasseByIdQuery.refetch();
  }, [showClasseDialogOpen]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchClasseByIdQuery.data;
  const isLoading = fetchClasseByIdQuery.isFetching;

  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeClasseShowDialog());
  };

  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin

  return (
    <Dialog open={showClasseDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_CLASSE}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.SHOW_CLASSE}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            {classeShow && (
              <>
                {/* <div className="flex flex-row">
                  <Button size="title" style={{ pointerEvents: "none" }}>
                    <SquareUser className="mr-2 h-4 w-4" />
                    {strings.TEXTS.CLASSE_INFO}
                  </Button>
                </div> */}
                <table className="border-collapse border border-slate-400 ">
                  <tr>
                    <td className="border border-slate-300 ">
                      <b>{strings.TH.FILIERE}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.filiere?.title)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.filiere?.title}(
                      {data?.data?.filiere?.acronym})
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.NIVEAU}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() => copyToClipboard(data?.data?.niveau?.title)}
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.niveau?.title}({data?.data?.niveau?.acronym})
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

export default ShowClasseDialog;
