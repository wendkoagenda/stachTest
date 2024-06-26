import { AgentDaum } from "@/@types/Agent/Agent";
import { Badge } from "@/components/ui/badge";
import strings from "@/constants/strings.constant";
import {
  initialiseRefreshAgentList,
  openAgentDeleteDialog,
  openAgentShowDialog,
  openAgentUpdateDialog,
  openStatusDialog,
} from "@/redux/slices/agentSlice";
import { useFetchAgentsQuery } from "@/services/agent";
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
import DeletionAgentDialog from "./deletion";
import ShowAgentDialog from "./show";
import UpdateAgentDialog from "./update";
import loadPermissions from "@/utils/hooks/loadPermissions";
import UpdateUserStatusDialog from "@/pages/user/components/userstatus/UpdateUserStatusDialog";
import { Icons } from "@/constants/icons.constant";

export default function AgentDataTable() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  // Hook de récupération  de l'état  de rafraichissement
  const refreshAgentList = useAppSelector(
    (state) => state.agents.refreshAgentList
  );

  const [refreshAgentListLocal, setRefreshAgentListLocal] = useState(false);

  useEffect(() => {
    setRefreshAgentListLocal(refreshAgentList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshAgentList]);

  //Liste des permissions requises
  const [agentDestroy, setAgentDestroy] = useState(false);
  const [agentUserShow, setAgentUserShow] = useState(false);
  const [agentUpdate, setAgentUpdate] = useState(false);
  const [userActiveDesactive, setUserActiveDesactive] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentDestroy(
        permissions.userPermissions.includes(strings.PERMISSIONS.AGENT_DESTROY)
      );
      setAgentUserShow(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.AGENT_USER_SHOW
        )
      );
      setAgentUpdate(
        permissions.userPermissions.includes(strings.PERMISSIONS.AGENT_UPDATE)
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

  //Hook de récupération de la liste des agents (Redux store)
  const fetchAgentsQuery = useFetchAgentsQuery(access_token);

  // Récupération de la liste des agents au montage du composant
  useEffect(() => {
    fetchAgentsQuery.refetch();
    dispatch(initialiseRefreshAgentList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshAgentListLocal]);

  // Variables useState
  const [agentId, setAgentId] = useState(0);
  const [userId, setUserId] = useState(0);
  const [isActive, setIsActive] = useState(0);
  const [agentUuid, setAgentUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchAgentsQueryData = fetchAgentsQuery.data?.data;
  const data = Array.isArray(fetchAgentsQueryData) ? fetchAgentsQueryData : [];
  const isLoading = fetchAgentsQuery.isLoading;
  const error = fetchAgentsQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<AgentDaum>[]>(
    () => [
      {
        accessorKey: "agent.registration_number",
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
      // Ajoute d'autres colonnes pour les propriétés de Agent et User si nécessaire
      // Par exemple, pour accéder à la propriété "title" de l'objet "agent":
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
  const onDeleteClick = (agentId: number) => {
    setAgentId(agentId);
    dispatch(openAgentDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (agentUuid: string) => {
    setAgentUuid(agentUuid);
    dispatch(openAgentUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (agentUuid: string) => {
    setAgentUuid(agentUuid);
    dispatch(openAgentShowDialog());
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
          agentUserShow && (
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
          agentUserShow && agentUpdate && (
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
          agentDestroy && (
            <MRT_ActionMenuItem
              icon={<Icons.Delete className="mr-2 h-4 w-4" />}
              key="delete"
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                onDeleteClick(row.original.agent.id);
                closeMenu();
              }}
              table={table}
            />
          ),
        ]}
      />
      <DeletionAgentDialog agentId={agentId} />
      <UpdateAgentDialog agentUuid={agentUuid} />
      <ShowAgentDialog agentUuid={agentUuid} />
      <UpdateUserStatusDialog user_id={userId} is_active={isActive} />
    </>
  );
}
