import { ClasseDaum } from "@/@types/Classe/Classe";
import strings from "@/constants/strings.constant";
import {
  openClasseDeleteDialog,
  openClasseShowDialog,
  openClasseUpdateDialog,
} from "@/redux/slices/classeSlice";
import { useFetchClassesQuery } from "@/services/classe";
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
import usePermissions from "@/utils/hooks/usePermissions";

export default function ClasseDataTable() {
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
  const classeShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_SHOW
  );
  const classeUpdate = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_UPDATE
  );
  const classeDestroy = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_DESTROY
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des classes (Redux store)
  const fetchClassesQuery = useFetchClassesQuery(access_token);

  // Récupération de la liste des classes au montage du composant
  useEffect(() => {
    fetchClassesQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // Variables useState
  const [classeId, setClasseId] = useState(0);
  const [classeUuid, setClasseUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchClassesQueryData = fetchClassesQuery.data?.data;
  const data = Array.isArray(fetchClassesQueryData)
    ? fetchClassesQueryData
    : [];
  const isLoading = fetchClassesQuery.isLoading;
  const error = fetchClassesQuery.error;

  // Variables pour les colonnes de la DataTable
  const columns = useMemo<MRT_ColumnDef<ClasseDaum>[]>(
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
          <p>{`${row.original.filiere.acronym}${row.original.niveau.acronym}`}</p>
        ),
      },
      {
        accessorKey: "filiere.title",
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
        accessorKey: "niveau.title",
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
    setClasseUuid(classeUuid);
    dispatch(openClasseUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (classeUuid: string) => {
    setClasseUuid(classeUuid);
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
          classeShow && (
            <MRT_ActionMenuItem //or just use a normal MUI MenuItem component
              icon={<EyeIcon className="mr-2 h-4 w-4" />}
              key="edit"
              label={strings.BUTTONS.SHOW}
              onClick={() => {
                onShowClick(row.original.uuid);
                closeMenu();
              }}
              table={table}
            />
          ),
          classeUpdate && (
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
          classeDestroy && (
            <MRT_ActionMenuItem
              icon={<Trash2 className="mr-2 h-4 w-4" />}
              key="delete"
              label={strings.BUTTONS.DELETE}
              onClick={() => {
                // onDeleteClick(row.original.classe.id);
                closeMenu();
              }}
              table={table}
            />
          ),
        ]}
      />
      {/* <DeletionClasseDialog classeId={classeId} />
      <UpdateClasseDialog classeUuid={classeUuid} />*/}
      {/* <ShowClasseDialog classeUuid={classeUuid} /> */}
    </>
  );
}
