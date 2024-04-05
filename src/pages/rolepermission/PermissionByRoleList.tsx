import { RoleShowModel } from "@/@types/Role/Role";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { useFetchPermissionsRoleByIdQuery } from "@/services/role";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import PermissionByRoleDataTable from "./components/PermissionByRoleDataTable";
import GoBackButton from "@/components/custom/GoBackButton";

export default function PermissionByRoleList() {
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
  const permissionStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.MODULE_STORE
  );
  const permissionList = permissions.userPermissions.includes(
    strings.PERMISSIONS.MODULE_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();
  const { role_uuid } = useParams();

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
    fetchPermissionsRoleByIdQuery.data?.data;
  const isLoading = fetchPermissionsRoleByIdQuery.isLoading;
  const data = Array.isArray(fetchPermissionsRoleByIdQueryData)
    ? fetchPermissionsRoleByIdQueryData
    : [];
  //*******************Fin
  console.log("permissions", data);
  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un permission
  const onCreateClick = () => {
    // dispatch(openPermissionCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-6">
          <div className="flex felx-col">
            <GoBackButton />
            <div>
              <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
                {strings.TEXTS.LIST_PERMISSIONS} du role{" "}
                {fetchPermissionsRoleByIdQueryData?.title}
                <Button className="ml-2" style={{ pointerEvents: "none" }}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : Array.isArray(data) ? (
                    fetchPermissionsRoleByIdQueryData?.permissions.length
                  ) : (
                    0
                  )}
                </Button>
              </h4>
            </div>
            {/*  */}
          </div>
        </div>
        <div className="col-6 text-end">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button onClick={onCreateClick}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus /> <span>{strings.BUTTONS.ADD}</span>
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{strings.TOOLTIPS.ADD_MODULE}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
        </div>
      </div>
      <div className="mt-2">
        <PermissionByRoleDataTable />
      </div>
    </>
  );
}
