import CardSkeleton from "@/components/custom/skeleton/CardSkeleton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import strings from "@/constants/strings.constant";
import {
  openSeanceDeleteDialog,
  openSeanceShowDialog,
  openSeanceUpdateDialog,
} from "@/redux/slices/seanceSlice";
import { useFetchSeancesQuery } from "@/services/seance";
import { dateFormater } from "@/utils/functions/dateFormater";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { truncateTitle } from "@/utils/functions/truncateTitle";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, Eye, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import DeletionSeanceDialog from "./deletion";
import UpdateSeanceDialog from "./update";
import ShowSeanceDialog from "./show";

export default function SeanceDataTable() {
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
  const seanceShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_SHOW
  );
  const seanceUpdate = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_UPDATE
  );
  const seanceDestroy = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.SEANCE_DESTROY
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
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
  const seances = Array.isArray(fetchSeancesQueryData)
    ? fetchSeancesQueryData
    : [];
  const isLoading = fetchSeancesQuery.isLoading;
  const error = fetchSeancesQuery.error;

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
  // Systheme de recherche et de pagination
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const onResetSearchTermClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const seancesToShow = seances
    .filter(
      (seance) =>
        seance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seance.created_at.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    seances.filter(
      (seance) =>
        seance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        seance.created_at.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
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
      <div className="flex flex-row gap-2 mb-6">
        <Input
          type="text"
          placeholder="Entrez le titre ou la date de la séance pour rechercher. "
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <Button size="icon" variant="outline" onClick={onResetSearchTermClick}>
          <X />
        </Button>
      </div>
      {isLoading ? (
        <CardSkeleton />
      ) : seancesToShow.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {seancesToShow.map((seance, index) => (
            <div key={index} className="max-w-[150] max-h-[150] ">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="mb-4">
                      <p className="mb-2">{truncateTitle(seance.title, 20)}</p>
                      <hr className="my-2" />
                      <p className="mt-2">{dateFormater(seance.created_at)}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <table className="table-fixed border-collapse w-full">
                    <thead>
                      <tr>
                        <td className="w-1/2 ">
                          <p>CM : {seance.vh_cm_eff} h</p>
                          <p>TD: {seance.vh_td_eff} h </p>
                          <p>TP : {seance.vh_tp_eff} h</p>
                        </td>
                        <td className="w-1/2">
                          <p>CM ex : {seance.ex_vh_cm_eff} h</p>
                          <p>TD ex : {seance.ex_vh_td_eff} h </p>
                          <p>TP ex : {seance.ex_vh_tp_eff} h</p>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </CardContent>
                <CardFooter className="flex flex-row justify-end">
                  {seanceShow && (
                    <>
                      <Button
                        size="icon"
                        onClick={() => {
                          onShowClick(seance.uuid);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => {
                          onEditClick(seance.uuid);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        onClick={() => {
                          onDeleteClick(seance.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </CardFooter>
              </Card>
            </div>
          ))}
          <ReactPaginate
            breakLabel="..."
            nextLabel="Passer >"
            pageRangeDisplayed={5}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            previousLabel="< Revenir"
            containerClassName="pagination flex mt-4"
            activeClassName="bg-blue-500 text-white"
            pageClassName="mr-2"
            previousClassName="mr-2"
            nextClassName="mr-2"
            pageLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
            previousLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
            nextLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
            onPageChange={handlePageClick}
          />
        </div>
      ) : (
        <p>{strings.TEXTS.DEPARTEMENT_EMPTY}</p>
      )}
      <DeletionSeanceDialog seanceId={seanceId} />
      <UpdateSeanceDialog seanceUuid={seanceUuid} />
      <ShowSeanceDialog seanceUuid={seanceUuid} />
    </>
  );
}
