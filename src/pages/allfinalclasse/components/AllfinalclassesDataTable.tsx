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
import { useFetchDCNFsQuery } from "@/services/classe";
import { useFetchDepartementsQuery } from "@/services/departement";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import usePermissions from "@/utils/hooks/usePermissions";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

export default function AllfinalclassesDataTable() {
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
  const departementShow = decodedToken.userPermissions.includes(
    strings.PERMISSIONS.DEPARTEMENT_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de navigation
  const navigate = useNavigate();
  //Hook de récupération de la liste des departements (Redux store)
  const fetchDCNFsQuery = useFetchDCNFsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchDCNFsQueryData = fetchDCNFsQuery.data?.data;
  const isLoading = fetchDCNFsQuery.isLoading;
  const allfinalclasses = Array.isArray(fetchDCNFsQueryData)
    ? fetchDCNFsQueryData
    : [];
  //*******************Fin

  //*******************Déclaration des fonctions
  // Systheme de recherche et de pagination
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const onResetSearchTermClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const allfinalclassesToShow = allfinalclasses
    .filter((allfinalclasse) =>
      allfinalclasse.dc.departement.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    allfinalclasses.filter((allfinalclasse) =>
      allfinalclasse.nf.filiere.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Navigation vers les details du departements
  const handleGoToMoreDetailsShow = (dcnf_uuid: string, dcnf_id: number) => {
    navigate(`/classe/${dcnf_uuid}/${dcnf_id}`);
  };
  //*******************Fin
  return (
    <>
      <div className="flex flex-row gap-2 mb-6">
        <Input
          type="text"
          placeholder="Que cherchez vous ?"
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
      ) : allfinalclassesToShow.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {allfinalclassesToShow.map((allfinalclasse, index) => (
            <div key={index} className="max-w-[150] max-h-[150] ">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="mb-4">
                      <p className="mb-2">
                        {allfinalclasse.nf.filiere.title}{" "}
                        {allfinalclasse.nf.niveau.title} (
                        {allfinalclasse.nf.filiere.acronym}
                        {allfinalclasse.nf.niveau.acronym})
                      </p>
                      <hr className="my-2" />
                      <p className="mt-2 text-lg">
                        {allfinalclasse.dc.departement.title}{" "}
                        {allfinalclasse.dc.cycle.title}
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter className="flex flex-row justify-end">
                  {departementShow && (
                    <Button
                      onClick={() => {
                        handleGoToMoreDetailsShow(
                          allfinalclasse.uuid,
                          allfinalclasse.id
                        );
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {strings.BUTTONS.SHOW}
                    </Button>
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
        <p>{strings.TEXTS.CLASSE_EMPTY}</p>
      )}
    </>
  );
}
