import {
  ModuleShowByDCNFModel,
  ModuleShowByDCNFResponseDaum,
} from "@/@types/Module/Module";
import strings from "@/constants/strings.constant";
import {
  initialiseRefreshModuleList,
  openModuleDeleteDialog,
  openModuleShowDialog,
  openModuleUpdateDialog,
} from "@/redux/slices/moduleSlice";
import { useFetchModuleByDCNFQuery } from "@/services/module";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { genererBadgeStatut } from "@/utils/functions/generateDCNFSUMStateBadge";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
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
import { useParams } from "react-router-dom";
import DeletionDCNF_SUMDialog from "./deletion/DeleteDCNF_SUMDialog";
import ShowDCNF_SUMDialog from "./show/ShowDCNF_SUMDialog";
import UpdateModuleDialog from "./update";
import { Icons } from "@/constants/icons.constant";

export default function ModuleDataTableByDCNF({
  props_dcnf_uuid,
}: {
  props_dcnf_uuid?: string;
}) {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [dcnfsumDestroy, setDCNFSUMDestroy] = useState(false);
  const [seanceShow, setSeanceShow] = useState(false);
  const [dcnfsumShow, setDCNFSUMShow] = useState(false);
  const [dcnfsumUpdate, setDCNFSUMUpdate] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCNFSUMDestroy(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.DCNFSUM_DESTROY
        )
      );
      setSeanceShow(
        permissions.userPermissions.includes(strings.PERMISSIONS.SEANCE_SHOW)
      );
      setDCNFSUMShow(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNFSUM_SHOW)
      );
      setDCNFSUMUpdate(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNFSUM_UPDATE)
      );
    }
  }, []);
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Hook de récupération  de l'état  de rafraichissement
  const refreshModuleList = useAppSelector(
    (state) => state.modules.refreshModuleList
  );

  const [refreshModuleListLocal, setRefreshModuleListLocal] = useState(false);

  useEffect(() => {
    setRefreshModuleListLocal(refreshModuleList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshModuleList]);

  const { dcnf_uuid } = useParams();
  const dcnf_uuid_value = dcnf_uuid !== undefined ? dcnf_uuid : props_dcnf_uuid;
  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const moduleShowByDCNFModel: ModuleShowByDCNFModel = {
    dcnf_uuid: dcnf_uuid_value,
    access_token: access_token,
  };

  //Hook de récupération de la liste des modules (Redux store)
  const fetchModuleByDCNFQuery = useFetchModuleByDCNFQuery(
    moduleShowByDCNFModel
  );

  // Récupération de la liste des modules au montage du composant
  useEffect(() => {
    fetchModuleByDCNFQuery.refetch();
    dispatch(initialiseRefreshModuleList());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshModuleListLocal]);
  // Variables useState
  const [dcnf_sum_id, setDCNF_SUMId] = useState(0);
  const [dcnfsum_uuid, setDcnfsumUuid] = useState("");

  const [moduleUuid, setModuleUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchModuleByDCNFQueryData = fetchModuleByDCNFQuery.data?.data;
  const data = Array.isArray(fetchModuleByDCNFQueryData)
    ? fetchModuleByDCNFQueryData
    : [];
  const isLoading = fetchModuleByDCNFQuery.isFetching;
  const error = fetchModuleByDCNFQuery.error;

  const columns = useMemo<MRT_ColumnDef<ModuleShowByDCNFResponseDaum>[]>(
    () => [
      {
        accessorKey: "su_m.module.title",
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
        accessorKey: "su_m.module.acronym",
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
        accessorKey: "su_m.module.code",
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
        accessorKey: "su_m.module.vht",
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
            cell.row.original.su_m.module.vh_tp +
            cell.row.original.su_m.module.vh_td +
            cell.row.original.su_m.module.vh_cm
          );
        },
      },
      {
        accessorKey: "su_m.module.credits",
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
        accessorKey: "su_m.module.coef",
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
      {
        accessorKey: "statut",
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
          const statut = cell.getValue<string>(); // Supposons que cell.value contienne la valeur booléenne du statut
          return genererBadgeStatut(statut);
        },
      },
    ],
    []
  );
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de suppression
  const onDeleteClick = (dcnf_sum_id: number) => {
    setDCNF_SUMId(dcnf_sum_id);
    dispatch(openModuleDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (moduleUuid: string) => {
    setModuleUuid(moduleUuid);
    dispatch(openModuleUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (dcnfsum_uuid: string, dcnfsum_id: number) => {
    setDcnfsumUuid(dcnfsum_uuid);
    setDCNF_SUMId(dcnfsum_id);
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
          <>
            {seanceShow && dcnfsumShow && (
              <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
                icon={<Icons.Show className="mr-2 h-4 w-4" />}
                key="show"
                label={strings.BUTTONS.SHOW}
                onClick={() => {
                  onShowClick(row.original.uuid, row.original.id);
                  closeMenu();
                }}
                table={table}
              />
            )}
            {dcnfsumUpdate && (
              <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
                icon={<Icons.Edit className="mr-2 h-4 w-4" />}
                key="edit"
                disabled
                label={strings.BUTTONS.EDIT}
                onClick={() => {
                  onEditClick(row.original.uuid);
                  closeMenu();
                }}
                table={table}
              />
            )}
            {dcnfsumDestroy && (
              <MRT_ActionMenuItem
                icon={<Icons.Delete className="mr-2 h-4 w-4" />}
                key="delete"
                label={strings.BUTTONS.WITHDRAW}
                onClick={() => {
                  onDeleteClick(row.original.id);
                  closeMenu();
                }}
                table={table}
              />
            )}
          </>,
        ]}
      />
      <DeletionDCNF_SUMDialog dcnf_sum_id={dcnf_sum_id} />
      <UpdateModuleDialog moduleUuid={moduleUuid} />
      <ShowDCNF_SUMDialog
        dcnfsum_uuid={dcnfsum_uuid}
        dcnf_sum_id={dcnf_sum_id}
      />
      {/* moduleUuid = mudule uuid */}
    </>
  );
}
