import { MyClassesShowByDCNFModel } from "@/@types/Singles/Dcnfsumt";
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
import { useFetchMyClasseDetailsQuery } from "@/services/module";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Eye, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import ShowDCNF_SUMDialog from "./show/ShowDCNF_SUMDialog";

export default function MymoduleDataTableByDCNF({
  dcnf_id,
}: {
  dcnf_id: number;
}) {
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
  const departementShow = permissions.userPermissions.includes(
    strings.PERMISSIONS.DEPARTEMENT_SHOW
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  // Hook de navigation
  const navigate = useNavigate();

  //Hook de récupération de la liste des departements (Redux store)
  const myclasseShowModel: MyClassesShowByDCNFModel = {
    dcnf_id: dcnf_id,
    access_token: access_token,
  };
  const fetchMyClasseByDCNFQuery =
    useFetchMyClasseDetailsQuery(myclasseShowModel);

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyClasseByDCNFQueryData = fetchMyClasseByDCNFQuery.data?.data;
  const isLoading = fetchMyClasseByDCNFQuery.isLoading;
  const mymodulesbyDCNFs = Array.isArray(fetchMyClasseByDCNFQueryData)
    ? fetchMyClasseByDCNFQueryData
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

  const mymodulesToShow = mymodulesbyDCNFs
    .filter((mymodulesbyDCNF) =>
      mymodulesbyDCNF.dcnfsum.su_m.module.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    mymodulesbyDCNFs.filter((mymodulesbyDCNF) =>
      mymodulesbyDCNF.dcnfsum.dcnf.nf.filiere.title
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
        <div className="grid grid-cols-4 gap-4">
          {mymodulesToShow.map((mymodulesbyDCNF, index) => (
            <div key={index} className="max-w-[150] max-h-[150] ">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="mb-4">
                      <p className="mb-2">
                        {mymodulesbyDCNF.dcnfsum.su_m.module.title}
                      </p>
                      <hr className="my-2" />
                      <p className="mt-2 text-base ">
                        {mymodulesbyDCNF.dcnfsum.su_m.s_u.ue.title} ({" "}
                        {mymodulesbyDCNF.dcnfsum.su_m.s_u.semestre.acronym})
                      </p>
                      <p className="mt-2 text-base ">
                        {mymodulesbyDCNF.dcnfsum.dcnf.nf.filiere.title} ({" "}
                        {mymodulesbyDCNF.dcnfsum.dcnf.nf.niveau.title})
                      </p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Card Content</p>
                </CardContent>
                <CardFooter className="flex flex-row justify-end">
                  <Button
                    onClick={() => {
                      onShowClick(
                        mymodulesbyDCNF.dcnfsum.uuid,
                        mymodulesbyDCNF.dcnfsum.id
                      );
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {strings.BUTTONS.SHOW}
                  </Button>
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
      <ShowDCNF_SUMDialog
        dcnfsum_uuid={dcnfsum_uuid}
        dcnf_sum_id={dcnf_sum_id}
      />
    </>
  );
}
