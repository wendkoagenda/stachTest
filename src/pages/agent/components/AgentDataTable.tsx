import { AgentDaum } from "@/@types/Agent";
import strings from "@/constants/strings.constant";
import {
  openAgentDeleteDialog,
  openAgentShowDialog,
  openAgentUpdateDialog,
} from "@/redux/slices/agentSlice";
import { useFetchAgentsQuery } from "@/services/agent";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, Eye, EyeIcon, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import DeletionAgentDialog from "./deletion";
import UpdateAgentDialog from "./update";
import ShowAgentDialog from "./show";

export default function AgentDataTable() {
  // Var
  const access_token: string =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ||
    "access_token";

  const fetchAgentsQuery = useFetchAgentsQuery(access_token);

  useEffect(() => {
    fetchAgentsQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAgentsQueryData = fetchAgentsQuery.data?.data;
  const data = Array.isArray(fetchAgentsQueryData) ? fetchAgentsQueryData : [];

  const isLoading = fetchAgentsQuery.isLoading;
  // const isFetching = fetchAgentsQuery.isFetching;
  const error = fetchAgentsQuery.error;
  const dispatch = useAppDispatch();

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
    ],
    []
  );
  const [agentId, setAgentId] = useState(0);
  const [agentUuid, setAgentUuid] = useState("");

  const onDeleteClick = (agentId: number) => {
    console.log("agentId", agentId);
    setAgentId(agentId);
    dispatch(openAgentDeleteDialog());
  };

  const onEditClick = (agentUuid: string) => {
    setAgentUuid(agentUuid);
    dispatch(openAgentUpdateDialog());
  };
  const onShowClick = (agentUuid: string) => {
    setAgentUuid(agentUuid);
    dispatch(openAgentShowDialog());
  };

  if (error) {
    if ("status" in error) {
      return renderFetchBaseQueryError(error as FetchBaseQueryError);
    } else {
      return renderSerializedError(error as SerializedError);
    }
  }
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
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<EyeIcon className="mr-2 h-4 w-4" />}
            key="edit"
            label={strings.BUTTONS.SHOW}
            onClick={() => {
              onShowClick(row.original.uuid);
              closeMenu();
            }}
            table={table}
          />,
          <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
            icon={<Edit2 className="mr-2 h-4 w-4" />}
            key="edit"
            label={strings.BUTTONS.EDIT}
            onClick={() => {
              onEditClick(row.original.uuid);
              closeMenu();
            }}
            table={table}
          />,
          <MRT_ActionMenuItem
            icon={<Trash2 className="mr-2 h-4 w-4" />}
            key="delete"
            label={strings.BUTTONS.DELETE}
            onClick={() => {
              onDeleteClick(row.original.agent.id);
              closeMenu();
            }}
            table={table}
          />,
        ]}
      />
      <DeletionAgentDialog agentId={agentId} />
      <UpdateAgentDialog agentUuid={agentUuid} />
      <ShowAgentDialog agentUuid={agentUuid} />
    </>
  );
}
