import { SeanceDaum } from "@/@types/Seance/Seance";
import strings from "@/constants/strings.constant";
import {
  openSeanceDeleteDialog,
  openSeanceShowDialog,
  openSeanceUpdateDialog,
} from "@/redux/slices/seanceSlice";
import { useFetchSeancesQuery } from "@/services/seance";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, EyeIcon, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import DeletionSeanceDialog from "./deletion";
import ShowSeanceDialog from "./show";
import UpdateSeanceDialog from "./update";

export default function SeanceDataTable2() {
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
  const seanceShow = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_SHOW
  );
  const seanceUpdate = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_UPDATE
  );
  const seanceDestroy = permissions.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_DESTROY
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des seances (Redux store)
  const fetchSeancesQuery = useFetchSeancesQuery(access_token);

  // Récupération de la liste des seances au montage du composant
  useEffect(() => {
    fetchSeancesQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Variables useState
  const [seanceId, setSeanceId] = useState(0);
  const [seanceUuid, setSeanceUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchSeancesQueryData = fetchSeancesQuery.data?.data;
  const data = Array.isArray(fetchSeancesQueryData)
    ? fetchSeancesQueryData
    : [];
  const isLoading = fetchSeancesQuery.isLoading;
  const error = fetchSeancesQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<SeanceDaum>[]>(
    () => [
      {
        accessorKey: "title",
        header: strings.TH.TITLE,
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
        accessorKey: "created_at",
        header: strings.TH.CREATED_AT,
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
    ],
    []
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de suppression
  const onDeleteClick = (seanceId: number) => {
    setSeanceId(seanceId);
    dispatch(openSeanceDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (seanceUuid: string) => {
    setSeanceUuid(seanceUuid);
    dispatch(openSeanceUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (seanceUuid: string) => {
    setSeanceUuid(seanceUuid);
    dispatch(openSeanceShowDialog());
  };
  //*******************Fin

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
          seanceShow && (
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
          seanceUpdate && (
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
          seanceDestroy && (
            <MRT_ActionMenuItem
              icon={<Trash2 className="mr-2 h-4 w-4" />}
              key="delete"
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                onDeleteClick(row.original.id);
                closeMenu();
              }}
              table={table}
            />
          ),
        ]}
      />
      <DeletionSeanceDialog seanceId={seanceId} />
      <UpdateSeanceDialog seanceUuid={seanceUuid} />
      <ShowSeanceDialog seanceUuid={seanceUuid} />
    </>
  );
}
