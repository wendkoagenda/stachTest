import { RoleShowModel } from "@/@types/Role/Role";
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
import { useFetchPermissionsRoleByIdQuery } from "@/services/role";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Eye, Shield, X } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";

export default function PermissionByRoleDataTable() {
  const { role_uuid } = useParams();

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
  // Préparation du paramettre du hook de recuperation des détails d'un permissions
  const permissionsRoleByIdModel: RoleShowModel = {
    role_uuid: role_uuid,
    access_token: access_token,
  };
  //Hook de récupération de la liste des permissions (Redux store)
  const fetchPermissionsRoleByIdQuery = useFetchPermissionsRoleByIdQuery(
    permissionsRoleByIdModel
  );
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchPermissionsRoleByIdQueryData =
    fetchPermissionsRoleByIdQuery.data?.data?.permissions;
  const isLoading = fetchPermissionsRoleByIdQuery.isLoading;
  const data = Array.isArray(fetchPermissionsRoleByIdQueryData)
    ? fetchPermissionsRoleByIdQueryData
    : [];
  //*******************Fin

  //*******************Déclaration des fonctions
  // Systheme de recherche et de pagination
  const pageSize = 32;
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const onResetSearchTermClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchTerm("");
  };

  const dataShow = data
    .filter((per) => per.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(currentPage * pageSize, (currentPage + 1) * pageSize);

  const pageCount = Math.ceil(
    data.filter((per) =>
      per.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).length / pageSize
  );

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
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
      ) : dataShow.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {dataShow.map((per, index) => (
            <div key={index} className="max-w-[150] max-h-[150] ">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <div className="mb-4">
                      <Shield className="mb-2" color="red" />
                      <p className="mb-2">{per.title}</p>
                      <hr className="my-2" />
                      <p className="mt-2 text-base ">{per.description}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                {/* <CardFooter className="flex flex-row justify-end">
                  <Button
                    onClick={() => {
                      onShowClick(
                        data.dcnfsum.uuid,
                        data.dcnfsum.id
                      );
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {strings.BUTTONS.SHOW}
                  </Button>
                </CardFooter> */}
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
        <p>{strings.TEXTS.PERMISSIONS_EMPTY}</p>
      )}
      {/* <ShowDCNF_SUMDialog
        dcnfsum_uuid={dcnfsum_uuid}
        dcnf_sum_id={dcnf_sum_id}
      /> */}
    </>
  );
}
