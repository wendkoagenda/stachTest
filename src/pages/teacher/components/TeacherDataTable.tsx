import { TeacherDaum } from "@/@types/Teacher/Teacher";
import { Badge } from "@/components/ui/badge";
import strings from "@/constants/strings.constant";
import {
  initialiseRefreshTeacherList,
  openTeacherDeleteDialog,
  openTeacherShowDialog,
  openTeacherUpdateDialog,
} from "@/redux/slices/teacherSlice";
import { useFetchTeachersQuery } from "@/services/teacher";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, EyeIcon, Key, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import DeletionTeacherDialog from "./deletion";
import ShowTeacherDialog from "./show";
import UpdateTeacherDialog from "./update";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { openStatusDialog } from "@/redux/slices/agentSlice";
import UpdateUserStatusDialog from "@/pages/user/components/userstatus/UpdateUserStatusDialog";
import { Icons } from "@/constants/icons.constant";

export default function TeacherDataTable() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  // Hook de récupération  de l'état  de rafraichissement
  const refreshTeacherList = useAppSelector(
    (state) => state.teachers.refreshTeacherList
  );

  const [refreshTeacherListLocal, setRefreshTeacherListLocal] = useState(false);

  useEffect(() => {
    setRefreshTeacherListLocal(refreshTeacherList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTeacherList]);
  //Liste des permissions requises
  const [teacherDestroy, setAgentDestroy] = useState(false);
  const [teacherUserShow, setAgentUserShow] = useState(false);
  const [teacherUpdate, setAgentUpdate] = useState(false);
  const [userActiveDesactive, setUserActiveDesactive] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentDestroy(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.TEACHER_DESTROY
        )
      );
      setAgentUserShow(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.TEACHER_USER_SHOW
        )
      );
      setAgentUpdate(
        permissions.userPermissions.includes(strings.PERMISSIONS.TEACHER_UPDATE)
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

  //Hook de récupération de la liste des teachers (Redux store)
  const fetchTeachersQuery = useFetchTeachersQuery(access_token);

  // Récupération de la liste des teachers au montage du composant
  useEffect(() => {
    fetchTeachersQuery.refetch();
    dispatch(initialiseRefreshTeacherList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTeacherListLocal]);
  // Variables useState
  const [teacherId, setTeacherId] = useState(0);
  const [teacherUuid, setTeacherUuid] = useState("");
  const [userId, setUserId] = useState(0);
  const [isActive, setIsActive] = useState(0);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchTeachersQueryData = fetchTeachersQuery.data?.data;
  const data = Array.isArray(fetchTeachersQueryData)
    ? fetchTeachersQueryData
    : [];
  const isLoading = fetchTeachersQuery.isLoading;
  const error = fetchTeachersQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<TeacherDaum>[]>(
    () => [
      {
        accessorKey: "teacher.registration_number",
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
      // Ajoute d'autres colonnes pour les propriétés de Teacher et User si nécessaire
      // Par exemple, pour accéder à la propriété "title" de l'objet "teacher":
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
  const onDeleteClick = (teacherId: number) => {
    setTeacherId(teacherId);
    dispatch(openTeacherDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (teacherUuid: string) => {
    setTeacherUuid(teacherUuid);
    dispatch(openTeacherUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (teacherUuid: string) => {
    setTeacherUuid(teacherUuid);
    dispatch(openTeacherShowDialog());
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
          teacherUserShow && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Icons.Show className="mr-2 h-4 w-4" />}
              key="show"
              label={strings.BUTTONS.SHOW}
              onClick={() => {
                onShowClick(row.original.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          teacherUserShow && teacherUpdate && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Icons.Edit className="mr-2 h-4 w-4" />}
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
          teacherDestroy && (
            <MRT_ActionMenuItem
              icon={<Icons.Delete className="mr-2 h-4 w-4" />}
              key="delete"
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                onDeleteClick(row.original.teacher.id);
                closeMenu();
              }}
              table={table}
            />
          ),
        ]}
      />
      <DeletionTeacherDialog teacherId={teacherId} />
      <UpdateTeacherDialog teacherUuid={teacherUuid} />
      <ShowTeacherDialog teacherUuid={teacherUuid} />
      <UpdateUserStatusDialog user_id={userId} is_active={isActive} />
    </>
  );
}
