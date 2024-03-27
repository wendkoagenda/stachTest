import { ClasseShowByDC, ClasseShowByDCModel } from "@/@types/Classe/Classe";
import strings from "@/constants/strings.constant";
import {
  openClasseDeleteDialog,
  openClasseShowDialog,
  openClasseUpdateDialog,
} from "@/redux/slices/classeSlice";
import { useFetchClassesByDCUuIdQuery } from "@/services/classe";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
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
// import DeletionClasseDialog from "./deletion";
// import ShowClasseDialog from "./show";
// import UpdateClasseDialog from "./update";
import loadPermissions from "@/utils/hooks/loadPermissions";
import ShowClasseDialog from "../show";

export default function ClasseDataTableByDepartement({
  dc_uuid,
}: {
  dc_uuid: string | undefined;
}) {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [dcnfDestroy, setDCNFDestroy] = useState(false);
  const [dcnfShow, setDCNFShow] = useState(false);
  const [dcnfUpdate, setDCNFUpdate] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCNFUpdate(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_UPDATE)
      );
      setDCNFShow(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_SHOW)
      );
      setDCNFDestroy(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNF_DESTROY)
      );
    }
  }, []);
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Préparation du paramettre du hook de recuperation des détails d'un students
  const classesByDCShowModel: ClasseShowByDCModel = {
    dc_uuid: dc_uuid,
    access_token: access_token,
  };
  const fetchClassesByDCUuIdQuery =
    useFetchClassesByDCUuIdQuery(classesByDCShowModel);
  dc_uuid;
  // Récupération de la liste des classes au montage du composant
  useEffect(() => {
    fetchClassesByDCUuIdQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Variables useState
  const [classeId, setClasseId] = useState(0);
  const [classeUuid, setClasseUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchClassesByDCUuIdData = fetchClassesByDCUuIdQuery.data?.data;
  const data = Array.isArray(fetchClassesByDCUuIdData)
    ? fetchClassesByDCUuIdData
    : [];
  const isLoading = fetchClassesByDCUuIdQuery.isLoading;
  const error = fetchClassesByDCUuIdQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<ClasseShowByDC>[]>(
    () => [
      {
        accessorKey: "Classe",
        header: strings.TH.CLASSE,
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
        Cell: ({ row }) => (
          <p>{`${row.original.nf.filiere.acronym}${row.original.nf.niveau.acronym}`}</p>
        ),
      },
      {
        accessorKey: "nf.filiere.title",
        header: strings.TH.FILIERE,
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
      {
        accessorKey: "nf.niveau.title",
        header: strings.TH.NIVEAU,
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
  const onDeleteClick = (classeId: number) => {
    setClasseId(classeId);
    dispatch(openClasseDeleteDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (classeUuid: string) => {
    // ClasseUuid = dcnf_uuid
    setClasseUuid(classeUuid);
    dispatch(openClasseUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (classeUuid: string, classeId: number) => {
    // ClasseUuid = dcnf_uuid, classeId = dcnf_id
    setClasseUuid(classeUuid);
    setClasseId(classeId);
    dispatch(openClasseShowDialog());
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
          dcnfShow && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<EyeIcon className="mr-2 h-4 w-4" />}
              key="show"
              label={strings.BUTTONS.SHOW}
              onClick={() => {
                onShowClick(row.original.uuid, row.original.id);
                closeMenu();
              }}
              table={table}
            />
          ),
          dcnfUpdate && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<Edit2 className="mr-2 h-4 w-4" />}
              key="edit"
              disabled
              label={strings.BUTTONS.EDIT}
              onClick={() => {
                onEditClick(row.original.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          dcnfDestroy && (
            <MRT_ActionMenuItem
              icon={<Trash2 className="mr-2 h-4 w-4" />}
              key="delete"
              disabled
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
      {/* <DeletionClasseDialog classeId={classeId} />
      <UpdateClasseDialog classeUuid={classeUuid} />*/}
      <ShowClasseDialog classeUuid={classeUuid} classeId={classeId} />
    </>
  );
}
