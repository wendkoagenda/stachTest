/* eslint-disable react-hooks/exhaustive-deps */
import { UserShowModel } from "@/@types/Global/User";
import TableSkeleton from "@/components/custom/skeleton/TableSkeleton";
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
import { closeStudentShowDialog } from "@/redux/slices/studentSlice";
import { useFetchStudentByIdQuery } from "@/services/student";

import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { CircleUser, Loader2, SquareUser, X } from "lucide-react";
import { useEffect } from "react";
import { Icons } from "@/constants/icons.constant";

const ShowStudentDialog = ({ studentUuid }: { studentUuid: string }) => {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const studentShow = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de la boite de dialogue du tableau des détails (Redux Store)
  const showStudentDialogOpen = useAppSelector(
    (state) => state.students.showStudentDialogOpen
  );
  // Préparation du paramettre du hook de recuperation des détails d'un students
  const actorShowModel: UserShowModel = {
    userUuid: studentUuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un student (RTK)
  const fetchStudentByIdQuery = useFetchStudentByIdQuery(actorShowModel);

  // Récupération des détails de l'student au montage du composant
  useEffect(() => {
    fetchStudentByIdQuery.refetch();
  }, [showStudentDialogOpen]);
  //*******************Fin

  //*******************Déclaration d'autres variables
  const data = fetchStudentByIdQuery.data;
  const isLoading = fetchStudentByIdQuery.isFetching;

  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction de fermeture de la boite de dialogue du tableau de détails  (Redux store)
  const onCloseClick = () => {
    dispatch(closeStudentShowDialog());
  };

  // Fonction de copie des données dans les cellules du tableau des détails dans le presse papier
  const copyToClipboard = (content: string | undefined) => {
    if (typeof content === "string") {
      navigator.clipboard.writeText(content);
    }
  };
  //*******************Fin

  return (
    <Dialog open={showStudentDialogOpen} onOpenChange={onCloseClick}>
      <DialogContent className="max-w-[500px] overflow-y-auto max-h-[500px] md:max-w-[1000px] md:max-h-[600px] md:overflow-hidden">
        <DialogHeader>
          <DialogTitle>{strings.TEXTS.SHOW_STUDENT}</DialogTitle>
          <DialogDescription>
            {strings.INSTRUCTIONS.SHOW_STUDENT}
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <>
            {studentShow && (
              <>
                <div className="flex flex-row">
                  <Button size="title" style={{ pointerEvents: "none" }}>
                    <SquareUser className="mr-2 h-4 w-4" />
                    {strings.TEXTS.STUDENT_INFO}
                  </Button>
                </div>
                <table className="border-collapse border border-slate-400 ">
                  <tr>
                    <td className="border border-slate-300 ">
                      <b>{strings.TH.TITLE}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.student?.title)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.student?.title}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.BANNER}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.student?.banner)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.student?.banner}
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.REGISTRATION_NO}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(
                          data?.data?.student?.registration_number
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {data?.data?.student?.registration_number}
                    </td>
                  </tr>
                </table>
                <div className="flex flex-row">
                  <Button size="title" style={{ pointerEvents: "none" }}>
                    <CircleUser className="mr-2 h-4 w-4" />
                    {strings.TEXTS.PERSONNE_INFO}
                  </Button>
                </div>
                <table className="border-collapse border border-slate-400 ">
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.LAST_NAME}</b>
                    </td>
                    <td
                      className="border border-slate-300 "
                      onClick={() =>
                        copyToClipboard(data?.data?.user?.last_name)
                      }
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
                      onClick={() =>
                        copyToClipboard(data?.data?.user?.first_name)
                      }
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
                      <Badge
                        variant={
                          data?.data?.user?.gender === "male"
                            ? "secondary"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {data?.data?.user?.gender === "female" ? "F" : "M"}
                      </Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-slate-300">
                      <b>{strings.TH.STATUS}</b>
                    </td>
                    <td className="border border-slate-300 ">
                      <Badge
                        variant={
                          data?.data?.user?.is_active === 1
                            ? "default"
                            : "destructive"
                        }
                        className="text-xs"
                      >
                        {data?.data?.user?.is_active === 1
                          ? "Actif"
                          : "Inactif"}
                      </Badge>
                    </td>
                  </tr>
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
              <Icons.Cancel className="mr-2 h-4 w-4" />
              {strings.BUTTONS.OK_CLOSE}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShowStudentDialog;
