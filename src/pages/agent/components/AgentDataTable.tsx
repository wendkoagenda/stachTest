import { AgentDaum } from "@/@types/Agent";
import strings from "@/constants/strings.constant";
import { RootState } from "@/redux/RootState";
import { fetchAgents } from "@/redux/slices/agentSlice";
import { Edit2, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AgentDataTable() {
  const dispatch = useDispatch();
  // Var
  const access_token = localStorage.getItem(
    "__kgfwe29__97efiyfcljbf68EF79WEFAD"
  );
  // Store Data Fetching
  useEffect(() => {
    dispatch(fetchAgents({ access_token: access_token }));
  }, [dispatch, access_token]);

  const data = useSelector((state: RootState) => state.agents.data);
  const isLoading = useSelector((state: RootState) => state.agents.isLoading);

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
  return (
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
      renderRowActionMenuItems={({ row, table }) => [
        <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
          icon={<Edit2 className="mr-2 h-4 w-4" />}
          key="edit"
          label={strings.BUTTONS.EDIT}
          onClick={() => console.info("Edit")}
          table={table}
        />,
        <MRT_ActionMenuItem
          icon={<Trash2 className="mr-2 h-4 w-4" />}
          key="delete"
          label={strings.BUTTONS.DELETE}
          onClick={() => console.info("Delete")}
          table={table}
        />,
      ]}
    />
  );
}
