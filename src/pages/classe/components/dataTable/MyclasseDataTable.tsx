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
import { openMyclasseShowDialog } from "@/redux/slices/classeSlice";
import { useFetchMyclassesQuery } from "@/services/classe";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ShowMyclasseDialog from "../show/ShowMyclasseDialog";

export default function MyclasseDataTable() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  //Hook de récupération de la liste des departements (Redux store)
  const fetchMyclassesQuery = useFetchMyclassesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyclassesQueryData = fetchMyclassesQuery.data?.data;
  const isLoading = fetchMyclassesQuery.isLoading;
  const myclasses = Array.isArray(fetchMyclassesQueryData)
    ? fetchMyclassesQueryData
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

  const myclassesToShow = myclasses
    .filter((myclasse) =>
      myclasse.dcnf.nf.filiere.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    myclasses.filter((myclasse) =>
      myclasse.dcnf.nf.niveau.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Navigation vers les details du departements
  const [dcnf_id, setDcnfId] = useState(0);
  const handleGoToMyclasseDetails = (dcnf_id: number) => {
    setDcnfId(dcnf_id);
    dispatch(openMyclasseShowDialog());
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
      ) : myclassesToShow.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-4">
            {myclassesToShow.map((myclasse, index) => (
              <div key={index} className="max-w-[150] max-h-[150] ">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="mb-4">
                        <p className="mb-2">
                          {myclasse.dcnf.nf.filiere.title}{" "}
                          {myclasse.dcnf.nf.niveau.title} (
                          {myclasse.dcnf.nf.filiere.acronym}{" "}
                          {myclasse.dcnf.nf.niveau.acronym})
                        </p>
                        <hr className="my-2" />
                        <p className="mt-2 text-base">
                          {myclasse.dcnf.dc.departement.title}
                          {myclasse.dcnf.dc.cycle.title} (
                          {myclasse.dcnf.dc.departement.acronym}{" "}
                          {myclasse.dcnf.dc.cycle.acronym})
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="flex flex-row justify-end">
                    <Button
                      onClick={() => {
                        handleGoToMyclasseDetails(myclasse.dcnf.id);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      {strings.BUTTONS.SHOW}
                    </Button>
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
        <p>{strings.TEXTS.DEPARTEMENT_EMPTY}</p>
      )}
      <ShowMyclasseDialog dcnf_id={dcnf_id} />
    </>
  );
}
