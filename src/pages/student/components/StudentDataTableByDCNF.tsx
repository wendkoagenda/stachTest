import {
  ClasseShowByDCNFResponseDaum,
  ClasseShowModel,
} from "@/@types/Classe/Classe";
import { Badge } from "@/components/ui/badge";
import strings from "@/constants/strings.constant";
import {
  initialiseRefreshStudentList,
  openReponsabilityDialog,
  openStudentDeleteDialog,
  openStudentShowDialog,
  openStudentUpdateDialog,
} from "@/redux/slices/studentSlice";
import { useFetchClassesByDCNFQuery } from "@/services/classe";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, EyeIcon, Key, Star, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import DeletionStudentDialog from "./deletion";
import ShowStudentDialog from "./show";
import UpdateStudentDialog from "./update";
import { openStatusDialog } from "@/redux/slices/agentSlice";
import UpdateUserStatusDialog from "@/pages/user/components/userstatus/UpdateUserStatusDialog";
import UpdateReponsabilityDialog from "./update/responsability/UpdateReponsabilityDialog";
import { Icons } from "@/constants/icons.constant";

export default function StudentDataTableByDCNF() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [studentDestroy, setAgentDestroy] = useState(false);
  const [studentUserShow, setAgentUserShow] = useState(false);
  const [studentUpdate, setAgentUpdate] = useState(false);
  const [studentChangeAutority, setStudentChangeAutority] = useState(false);
  const [userActiveDesactive, setUserActiveDesactive] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentDestroy(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_DESTROY
        )
      );
      setAgentUserShow(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_USER_SHOW
        )
      );
      setAgentUpdate(
        permissions.userPermissions.includes(strings.PERMISSIONS.STUDENT_UPDATE)
      );
      setUserActiveDesactive(
        permissions.userPermissions.includes(strings.PERMISSIONS.USER_ACTIVE)
      );
      setStudentChangeAutority(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_CHANGE_AUTORITY
        )
      );
    }
  }, []);
  //*******************Fin

  // Declaration des hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de rafraichissement
  const refreshStudentList = useAppSelector(
    (state) => state.students.refreshStudentList
  );

  const [refreshStudentListLocal, setRefreshStudentListLocal] = useState(false);

  useEffect(() => {
    setRefreshStudentListLocal(refreshStudentList);
  }, [refreshStudentList]);

  // Recuperation du url params
  const { dcnf_uuid } = useParams();
  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const classeShowModel: ClasseShowModel = {
    dcnf_uuid: dcnf_uuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchClassesByDCNFQuery = useFetchClassesByDCNFQuery(classeShowModel);

  // Récupération des détails de l'classe au montage du composant
  useEffect(() => {
    fetchClassesByDCNFQuery.refetch();
    dispatch(initialiseRefreshStudentList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshStudentListLocal]);
  //*******************Fin
  //*******************Déclaration d'autres variables

  const [studentId, setStudentId] = useState(0);
  const [studentUuid, setStudentUuid] = useState("");
  const [userId, setUserId] = useState(0);
  const [isActive, setIsActive] = useState(0);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchStudentsQueryData = fetchClassesByDCNFQuery.data?.data;

  const data = Array.isArray(fetchStudentsQueryData)
    ? fetchStudentsQueryData
    : [];

  const isLoading = fetchClassesByDCNFQuery.isLoading;
  const error = fetchClassesByDCNFQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<ClasseShowByDCNFResponseDaum>[]>(
    () => [
      {
        accessorKey: "s.student.registration_number",
        header: strings.TH.REGISTRATION_NO,
        columnDefType: "data",
        enableClickToCopy: true,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        Cell: ({ cell }) => <p>{cell.getValue<number>()}</p>,
      },
      {
        accessorKey: "s.user.last_name",
        header: strings.TH.LAST_NAME,
        columnDefType: "data",
        enableClickToCopy: true,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      // Ajoute d'autres colonnes pour les propriétés de Student et User si nécessaire
      // Par exemple, pour accéder à la propriété "title" de l'objet "student":
      {
        accessorKey: "s.user.first_name",
        header: strings.TH.FIRST_NAME,
        enableClickToCopy: true,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      // De même pour les autres propriétés de l'objet "user"
      {
        accessorKey: "s.user.email",
        header: strings.TH.EMAIL,
        enableClickToCopy: true,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      {
        accessorKey: "s.user.phone1",
        header: strings.TH.PHONE1,
        enableClickToCopy: true,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        Cell: ({ cell }) => <p>{cell.getValue<string>()}</p>,
      },
      {
        accessorKey: "s.user.is_active",
        header: strings.TH.STATUS,
        enableClickToCopy: false,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        size: 100,
        Cell: ({ cell }) => {
          const isActive = cell.getValue<number>(); // Supposons que cell.value contienne la valeur booléenne du statut
          return (
            <Badge
              variant={isActive === 1 ? "default" : "destructive"}
              className="text-xs"
            >
              {isActive === 1 ? "Actif" : "Inactif"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "s.student.responsibility",
        header: strings.TH.RESPONSIBILITY,
        enableClickToCopy: false,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        size: 100,
        Cell: ({ cell }) => {
          const responsibility = cell.getValue<string>(); // Supposons que cell.value contienne la valeur booléenne du statut
          return (
            <Badge
              variant={
                responsibility === "none"
                  ? "default"
                  : responsibility === "delegue"
                  ? "destructive"
                  : "destructive"
              }
              className="text-xs"
            >
              {responsibility === "none"
                ? "Aucune"
                : responsibility === "delegue"
                ? "Délégué"
                : "Délégué Adj"}
            </Badge>
          );
        },
      },
      {
        accessorKey: "s.user.gender",
        header: strings.TH.GENDER,
        enableClickToCopy: false,
        enableColumnActions: true,
        enableColumnDragging: true,
        enableColumnFilter: true,
        enableColumnOrdering: true,
        enableEditing: true,
        enableGlobalFilter: true,
        enableGrouping: true,
        enableHiding: true,
        enableResizing: true,
        enableSorting: true,
        size: 100,
        Cell: ({ cell }) => {
          const gender = cell.getValue<string>(); // Supposons que cell.value contienne la valeur booléenne du statut
          return (
            <Badge
              variant={gender === "male" ? "secondary" : "secondary"}
              className="text-xs"
            >
              {gender === "female" ? "F" : "M"}
            </Badge>
          );
        },
      },
    ],
    []
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de suppression
  const onDeleteClick = (studentId: number) => {
    setStudentId(studentId);
    dispatch(openStudentDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (studentUuid: string) => {
    setStudentUuid(studentUuid);
    dispatch(openStudentUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (studentUuid: string) => {
    setStudentUuid(studentUuid);
    dispatch(openStudentShowDialog());
  };
  //*******************Fin
  const onStatusClick = (userId: number, isActive: number) => {
    setUserId(userId);
    setIsActive(isActive);
    dispatch(openStatusDialog());
  };
  const onResponsabilityClick = (studentId: number, studentUuid: string) => {
    setStudentId(studentId);
    setStudentUuid(studentUuid);
    dispatch(openReponsabilityDialog());
  };

  //*******************Gestion des erreurs de récupération
  if (error) {
    if ("status" in error) {
      return renderFetchBaseQueryError(error as FetchBaseQueryError);
    } else {
      return renderSerializedError(error as SerializedError);
    }
  }
  //*******************Fin

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection={false} //enable some features
        enableColumnOrdering={true} //enable a feature for all columns
        enableGlobalFilter={true} //turn off a feature
        localization={MRT_Localization_FR}
        muiTablePaperProps={{
          elevation: 0, //change the mui box shadow
          sx: {
            borderRadius: "20px",
            border: "1px solid #CCCCCC",
            padding: "10px",
          },
        }}
        state={{
          isLoading: isLoading,
        }}
        enableRowActions // Enable row actions
        positionActionsColumn="last"
        renderRowActionMenuItems={({ closeMenu, row, table }) => [
          studentUserShow && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Icons.Show className="mr-2 h-4 w-4" />}
              key="show"
              label={strings.BUTTONS.SHOW}
              onClick={() => {
                onShowClick(row.original.s.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          studentUpdate && studentUserShow && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Icons.Edit className="mr-2 h-4 w-4" />}
              key="edit"
              label={strings.BUTTONS.EDIT}
              onClick={() => {
                onEditClick(row.original.s.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          userActiveDesactive && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Key className="mr-2 h-4 w-4" />}
              key="status"
              label={strings.BUTTONS.STATUS}
              onClick={() => {
                onStatusClick(
                  row.original.s.user.id,
                  row.original.s.user.is_active
                );
                closeMenu();
              }}
              table={table}
            />
          ),
          studentChangeAutority && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Icons.Risponsibilite className="mr-2 h-4 w-4" />}
              key="responsibility"
              label={strings.BUTTONS.RESPONSABILITE}
              onClick={() => {
                onResponsabilityClick(
                  row.original.s.student.id,
                  row.original.s.uuid
                );
                closeMenu();
              }}
              table={table}
            />
          ),
          studentDestroy && (
            <MRT_ActionMenuItem
              icon={<Icons.Delete className="mr-2 h-4 w-4" />}
              key="delete"
              disabled
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                onDeleteClick(row.original.s.id);
                closeMenu();
              }}
              table={table}
            />
          ),
        ]}
      />
      <DeletionStudentDialog studentId={studentId} />
      <UpdateStudentDialog studentUuid={studentUuid} />
      <ShowStudentDialog studentUuid={studentUuid} />
      <UpdateUserStatusDialog user_id={userId} is_active={isActive} />
      {/* Le stuentId de UpdateResponsabilty est dans s.student  */}
      <UpdateReponsabilityDialog
        studentId={studentId}
        studentUuid={studentUuid}
      />
    </>
  );
}
