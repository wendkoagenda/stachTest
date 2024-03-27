import { StudentDaum } from "@/@types/Student/Student";
import { Badge } from "@/components/ui/badge";
import strings from "@/constants/strings.constant";
import {
  initialiseRefreshStudentList,
  openStudentDeleteDialog,
  openStudentShowDialog,
  openStudentUpdateDialog,
} from "@/redux/slices/studentSlice";
import { useFetchStudentsQuery } from "@/services/student";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, EyeIcon, Key, Trash2 } from "lucide-react";

import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import DeletionStudentDialog from "./deletion";
import ShowStudentDialog from "./show";
import UpdateStudentDialog from "./update";
import loadPermissions from "@/utils/hooks/loadPermissions";
import {
  MRT_ActionMenuItem,
  MRT_ColumnDef,
  MaterialReactTable,
} from "material-react-table";
import { openStatusDialog } from "@/redux/slices/agentSlice";
import UpdateUserStatusDialog from "@/pages/user/components/userstatus/UpdateUserStatusDialog";

export default function StudentDataTable() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  // Hook de récupération  de l'état  de rafraichissement
  const refreshStudentList = useAppSelector(
    (state) => state.students.refreshStudentList
  );

  const [refreshStudentListLocal, setRefreshStudentListLocal] = useState(false);

  useEffect(() => {
    setRefreshStudentListLocal(refreshStudentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshStudentList]);
  //Liste des permissions requises
  const [studentDestroy, setAgentDestroy] = useState(false);
  const [studentUserShow, setAgentUserShow] = useState(false);
  const [studentUpdate, setAgentUpdate] = useState(false);
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
    }
  }, []);
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des students (Redux store)
  const fetchStudentsQuery = useFetchStudentsQuery(access_token);

  // Récupération de la liste des students au montage du composant
  useEffect(() => {
    fetchStudentsQuery.refetch();
    dispatch(initialiseRefreshStudentList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshStudentListLocal]);
  // Variables useState
  const [studentId, setStudentId] = useState(0);
  const [studentUuid, setStudentUuid] = useState("");
  const [userId, setUserId] = useState(0);
  const [isActive, setIsActive] = useState(0);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchStudentsQueryData = fetchStudentsQuery.data?.data;
  const data = Array.isArray(fetchStudentsQueryData)
    ? fetchStudentsQueryData
    : [];
  const isLoading = fetchStudentsQuery.isLoading;
  const error = fetchStudentsQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<StudentDaum>[]>(
    () => [
      {
        accessorKey: "student.registration_number",
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
        accessorKey: "user.last_name",
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
        accessorKey: "user.first_name",
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
        accessorKey: "user.email",
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
        accessorKey: "user.phone1",
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
        accessorKey: "user.is_active",
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
        accessorKey: "user.gender",
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
              icon={<EyeIcon className="mr-2 h-4 w-4" />}
              key="show"
              label={strings.BUTTONS.SHOW}
              onClick={() => {
                onShowClick(row.original.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          studentUserShow && studentUpdate && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Edit2 className="mr-2 h-4 w-4" />}
              key="edit"
              label={strings.BUTTONS.EDIT}
              onClick={() => {
                onEditClick(row.original.uuid);
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
                  row.original.user.id,
                  row.original.user.is_active
                );
                closeMenu();
              }}
              table={table}
            />
          ),
          studentDestroy && (
            <MRT_ActionMenuItem
              icon={<Trash2 className="mr-2 h-4 w-4" />}
              key="delete"
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                onDeleteClick(row.original.student.id);
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
    </>
  );
}
