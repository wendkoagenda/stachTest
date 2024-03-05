import { ModuleDaum } from "@/@types/Module/Module";
import { Badge } from "@/components/ui/badge";
import strings from "@/constants/strings.constant";
import {
  openModuleDeleteDialog,
  openModuleShowDialog,
  openModuleUpdateDialog,
} from "@/redux/slices/moduleSlice";
import { useFetchModulesQuery } from "@/services/module";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { SerializedError, original } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, EyeIcon, Trash2 } from "lucide-react";
import {
  MRT_ActionMenuItem,
  MaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useEffect, useMemo, useState } from "react";
import DeletionModuleDialog from "./deletion";
import ShowModuleDialog from "./show";
import UpdateModuleDialog from "./update";
import usePermissions from "@/utils/hooks/usePermissions";

export default function ModuleDataTable() {
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
  const moduleShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_SHOW
  );
  const moduleUpdate = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_UPDATE
  );
  const moduleDestroy = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.TEACHER_DESTROY
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des modules (Redux store)
  const fetchModulesQuery = useFetchModulesQuery(access_token);

  // Récupération de la liste des modules au montage du composant
  useEffect(() => {
    fetchModulesQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Variables useState
  const [moduleId, setModuleId] = useState(0);
  const [moduleUuid, setModuleUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchModulesQueryData = fetchModulesQuery.data?.data;
  const data = Array.isArray(fetchModulesQueryData)
    ? fetchModulesQueryData
    : [];
  const isLoading = fetchModulesQuery.isLoading;
  const error = fetchModulesQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<ModuleDaum>[]>(
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
        accessorKey: "acronym",
        header: strings.TH.ACRONYM,
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
      // Ajoute d'autres colonnes pour les propriétés de Module et User si nécessaire
      // Par exemple, pour accéder à la propriété "title" de l'objet "module":
      {
        accessorKey: "code",
        header: strings.TH.CODE,
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
        accessorKey: "vht",
        header: strings.TH.VHT,
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
          return (
            cell.row.original.vh_tp +
            cell.row.original.vh_td +
            cell.row.original.vh_cm
          );
        },
      },
      {
        accessorKey: "credits",
        header: strings.TH.CREDIT,
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
        accessorKey: "coef",
        header: strings.TH.COEF,
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
  const onDeleteClick = (moduleId: number) => {
    setModuleId(moduleId);
    dispatch(openModuleDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (moduleUuid: string) => {
    setModuleUuid(moduleUuid);
    dispatch(openModuleUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (moduleUuid: string) => {
    setModuleUuid(moduleUuid);
    dispatch(openModuleShowDialog());
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
          moduleShow && (
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
          moduleUpdate && (
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
          moduleDestroy && (
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
      <DeletionModuleDialog moduleId={moduleId} />
      <UpdateModuleDialog moduleUuid={moduleUuid} />
      <ShowModuleDialog moduleUuid={moduleUuid} />
    </>
  );
}
