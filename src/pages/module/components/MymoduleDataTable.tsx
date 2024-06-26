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
import { openModuleShowDialog } from "@/redux/slices/moduleSlice";
import { useFetchMymodulesQuery } from "@/services/module";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ShowDCNF_SUMDialog from "./show/ShowDCNF_SUMDialog";

export default function MymoduleDataTable() {
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
  const fetchMymodulesQuery = useFetchMymodulesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMymodulesQueryData = fetchMymodulesQuery.data?.data;
  const isLoading = fetchMymodulesQuery.isLoading;
  const mymodules = Array.isArray(fetchMymodulesQueryData)
    ? fetchMymodulesQueryData
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

  const mymodulesToShow = mymodules
    .filter((mymodule) =>
      mymodule.dcnfsum.su_m.module.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    mymodules.filter((mymodule) =>
      mymodule.dcnfsum.dcnf.nf.filiere.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const [dcnf_sum_id, setDCNF_SUMId] = useState(0);
  const [dcnfsum_uuid, setDcnfsumUuid] = useState("");

  const onShowClick = (dcnfsum_uuid: string, dcnfsum_id: number) => {
    setDcnfsumUuid(dcnfsum_uuid);
    setDCNF_SUMId(dcnfsum_id);
    dispatch(openModuleShowDialog());
  };

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
      ) : mymodulesToShow.length > 0 ? (
        <>
          <div className="md:grid md:grid-cols-4 md:gap-4 grid grid-cols-1 gap-1">
            {mymodulesToShow.map((mymodule, index) => (
              <div key={index} className="max-w-[150] max-h-[150] ">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <div className="mb-4">
                        <p className="mb-2">
                          {mymodule.dcnfsum.su_m.module.title}
                        </p>
                        <hr className="my-2" />
                        <p className="mt-2 text-base ">
                          {mymodule.dcnfsum.su_m.s_u.ue.title} ({" "}
                          {mymodule.dcnfsum.su_m.s_u.semestre.acronym})
                        </p>
                        <p className="mt-2 text-base ">
                          {mymodule.dcnfsum.dcnf.nf.filiere.title} ({" "}
                          {mymodule.dcnfsum.dcnf.nf.niveau.title})
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="flex flex-row justify-end">
                    <Button
                      onClick={() => {
                        onShowClick(mymodule.dcnfsum.uuid, mymodule.dcnfsum.id);
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
          <div className="mt-">
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
      <ShowDCNF_SUMDialog
        dcnfsum_uuid={dcnfsum_uuid}
        dcnf_sum_id={dcnf_sum_id}
      />
    </>
  );
}
