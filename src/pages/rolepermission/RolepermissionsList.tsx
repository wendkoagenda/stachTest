import strings from "@/constants/strings.constant";
import RoleDataTable from "./components/RoleDataTable";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFetchRolesQuery } from "@/services/role";

export default function SettingsList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Hook de récupération de la liste des roles (Redux store)
  const fetchRolesQuery = useFetchRolesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchRolesQueryData = fetchRolesQuery.data?.data;
  const isLoading = fetchRolesQuery.isLoading;
  const roles = Array.isArray(fetchRolesQueryData) ? fetchRolesQueryData : [];

  return (
    <>
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12"> */}
      <div className="w-full mx-auto ">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.ROLE_LIST}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(roles) ? (
                roles.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="">
          <RoleDataTable />
        </div>
      </div>
    </>
  );
}
