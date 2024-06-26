import { SeancesShowByDCNFSUMModel } from "@/@types/Seance/Seance";
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
import { openStudentAllowUpdateDialog } from "@/redux/slices/moduleSlice";
import {
  initialiseRefreshSeanceList,
  openSeanceCreateDialog,
  openSeanceDeleteDialog,
  openSeanceShowDialog,
  openSeanceUpdateDialog,
  setTempSeanceUuid,
} from "@/redux/slices/seanceSlice";
import { useFetchSeancesByDCNFSUMQuery } from "@/services/seance";
import { dateFormater } from "@/utils/functions/dateFormater";
import {
  renderFetchBaseQueryError,
  renderSerializedError,
} from "@/utils/functions/errorRenders";
import { truncateTitle } from "@/utils/functions/truncateTitle";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/reduxHooks";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Edit2, Eye, FileLock, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import CreationSeanceDialog from "./creation";
import DeletionSeanceDialog from "./deletion";
import ShowSeanceDialog from "./show";
import UpdateSeanceDialog from "./update";

export default function SeanceDataTableByDCNFSUM({
  dcnfsum_id,
}: {
  dcnfsum_id: number | undefined;
}) {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  const t_id =
    localStorage.getItem("__tpiwubfacQWDBUR929dkhayfqdjMNg529q8d") ?? "0";
  const s_id =
    localStorage.getItem("__spiecjwvjvQGIWUIEB598156bckeoygqoddq") ?? "0";
  //*******************Fin
  // Hook de récupération  de l'état  de rafraichissement
  const refreshSeanceList = useAppSelector(
    (state) => state.modules.refreshModuleList
  );

  const [refreshSeanceListLocal, setRefreshSeanceListLocal] = useState(false);

  useEffect(() => {
    setRefreshSeanceListLocal(refreshSeanceList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshSeanceList]);
  //*******************Politique de gestion des permissons
  //Liste des permissions requises
  const [delegue, setDelegue] = useState(false);
  const [sub_delegue, setSubDelegue] = useState(false);
  const [delegueInter, setDelegueInter] = useState(false);
  const [sub_delegueInter, setSubDelegueInter] = useState(false);
  const [seanceShow, setSeanceShow] = useState(false);
  const [seanceDestroy, setSeanceDestroy] = useState(false);
  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDelegue(
        permissions.userPermissions.includes(strings.PERMISSIONS.DELEGUE)
      );
      setSubDelegue(
        permissions.userPermissions.includes(strings.PERMISSIONS.SUB_DELEGUE)
      );
      setDelegueInter(
        permissions.userPermissions.includes(strings.PERMISSIONS.DELEGUE_INTER)
      );
      setSubDelegueInter(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.SUB_DELEGUE_INTER
        )
      );
      setSeanceShow(
        permissions.userPermissions.includes(strings.PERMISSIONS.SEANCE_SHOW)
      );
      setSeanceDestroy(
        permissions.userPermissions.includes(strings.PERMISSIONS.SEANCE_DESTROY)
      );
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  // Préparation du paramettre du hook de recuperation des détails d'un modules
  const seancesShowByDCNFSUMModel: SeancesShowByDCNFSUMModel = {
    dcnfsum_id: dcnfsum_id,
    access_token: access_token,
  };

  //Hook de récupération de la liste des seances (Redux store)
  const fetchSeancesByDCNFSUMQuery = useFetchSeancesByDCNFSUMQuery(
    seancesShowByDCNFSUMModel
  );

  // Récupération de la liste des seances au montage du composant
  useEffect(() => {
    fetchSeancesByDCNFSUMQuery.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dispatch(initialiseRefreshSeanceList());
  }, [refreshSeanceListLocal]);

  // Variables useState
  const [seanceId, setSeanceId] = useState(0);
  const [seanceUuid, setSeanceUuid] = useState("");
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchSeancesByDCNFSUMQueryData = fetchSeancesByDCNFSUMQuery.data?.data;
  const seances = Array.isArray(fetchSeancesByDCNFSUMQueryData)
    ? fetchSeancesByDCNFSUMQueryData
    : [];
  const isLoading = fetchSeancesByDCNFSUMQuery.isLoading;
  const error = fetchSeancesByDCNFSUMQuery.error;
  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de suppression
  const onDeleteClick = (seanceId: number) => {
    setSeanceId(seanceId);
    dispatch(openSeanceDeleteDialog());
  };

  const onCreateClick = () => {
    dispatch(openSeanceCreateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue de mise à jour
  const onEditClick = (seanceUuid: string) => {
    setSeanceUuid(seanceUuid);
    dispatch(openSeanceUpdateDialog());
  };

  // Fonction pour l'ouverture de la boite de dialogue des détails
  const onShowClick = (seanceUuid: string) => {
    setSeanceUuid(seanceUuid);
    dispatch(setTempSeanceUuid(seanceUuid));
    dispatch(openSeanceShowDialog());
  };
  const onStudentAllowClick = () => {
    dispatch(openStudentAllowUpdateDialog());
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
        {parseInt(t_id) !== 0 ? (
          <>
            <Button size="icon" variant="default" onClick={onCreateClick}>
              <Plus />
            </Button>
            <Button size="icon" variant="default" onClick={onStudentAllowClick}>
              <FileLock />
            </Button>
          </>
        ) : (
          " "
        )}
        {parseInt(s_id) !== 0 &&
          (delegue || sub_delegue || sub_delegueInter || delegueInter) &&
          seances[0]?.dcnfsumt?.allow_student_entry === 1 && (
            <>
              <Button size="icon" variant="default" onClick={onCreateClick}>
                <Plus />
              </Button>
            </>
          )}
      </div>
      {isLoading ? (
        <CardSkeleton />
      ) : seancesToShow.length > 0 ? (
        <>
          <div className="md:grid md:grid-cols-4 md:gap-4 grid grid-cols-1 gap-1">
            {seancesToShow.map((seance, index) => (
              <div key={index} className="max-w-[150] max-h-[150] mb-2 ">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="mb-4">
                        <p className="mb-2">
                          {truncateTitle(seance.title, 20)}
                        </p>
                        <hr className="my-2" />
                        <p className="mt-2">
                          {dateFormater(seance.created_at)}
                        </p>
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
                    {/* //disponible pour tout le monde  */}
                    {seanceShow && (
                      <Button
                        size="icon"
                        onClick={() => {
                          onShowClick(seance.uuid);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    {/* controle enseignant */}
                    {parseInt(t_id) !== 0 && seanceShow && (
                      <>
                        {seance.agent_qr === "notYetApprouved" ? (
                          <Button
                            size="icon"
                            onClick={() => {
                              onEditClick(seance.uuid);
                            }}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          " "
                        )}
                        {seance.agent_qr === "notYetApprouved" &&
                        seanceDestroy ? (
                          <Button
                            size="icon"
                            onClick={() => {
                              onDeleteClick(seance.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        ) : (
                          " "
                        )}
                      </>
                    )}
                    {/* controle etudiant */}
                    {parseInt(s_id) !== 0 &&
                      (delegue ||
                        sub_delegue ||
                        sub_delegueInter ||
                        delegueInter) &&
                      seances[0]?.dcnfsumt?.allow_student_entry === 1 && (
                        <>
                          {seance.agent_qr === "notYetApprouved" ? (
                            <Button
                              size="icon"
                              onClick={() => {
                                onEditClick(seance.uuid);
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          ) : (
                            " "
                          )}
                          {seance.agent_qr === "notYetApprouved" &&
                          seanceDestroy ? (
                            <Button
                              size="icon"
                              onClick={() => {
                                onDeleteClick(seance.id);
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          ) : (
                            " "
                          )}
                        </>
                      )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <ReactPaginate
              breakLabel="..."
              nextLabel="Passer >"
              pageRangeDisplayed={5}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              previousLabel="< Revenir"
              containerClassName="pagination flex mt-4"
              activeClassName="bg-blue-500 text-white"
              pageClassName="md:m-2 m-2"
              previousClassName="md:m-2 m-2"
              nextClassName="md:m-2 m-2"
              pageLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              previousLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              nextLinkClassName="py-2 px-4 bg-white text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onPageChange={handlePageClick}
            />
          </div>
        </>
      ) : (
        <p>{strings.TEXTS.NO_SEANCES}</p>
      )}
      <DeletionSeanceDialog seanceId={seanceId} />
      <UpdateSeanceDialog seanceUuid={seanceUuid} />
      <ShowSeanceDialog seanceUuid={seanceUuid} />
      <CreationSeanceDialog dcnfsum_id={dcnfsum_id} />
    </>
  );
}
