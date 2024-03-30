import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import strings from "@/constants/strings.constant";
import { useFetchDepartementsQuery } from "@/services/departement";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2 } from "lucide-react";
import React from "react";
import DepartementDataTable from "./components/DepartementDataTable";
import MyclasseDataTable from "../dataTable/MyclasseDataTable";
import MymoduleDataTable from "./components/MymoduleDataTable";
import { useFetchMycoursesQuery } from "@/services/classe";
import {
  useFetchMyClasseDetailsQuery,
  useFetchMymodulesQuery,
} from "@/services/module";
import { MyClassesShowByDCNFModel } from "@/@types/Singles/Dcnfsumt";
import MymoduleDataTableByDCNF from "./components/MymoduleDataTableByDCNF";

export default function MymodulesListByDCNF({ dcnf_id }: { dcnf_id: number }) {
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
  const departementStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_STORE
  );
  const departementList = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  const myclasseShowModel: MyClassesShowByDCNFModel = {
    dcnf_id: dcnf_id,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
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

  //*******************Fin
  return (
    <>
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12"> */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.MY_MODULES_LIST}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(mymodulesbyDCNFs) ? (
                  mymodulesbyDCNFs.length
                ) : (
                  0
                )}
              </Button>
            </h4>
          </div>
          <div className="col-6 text-end">
            {/* {departementStore && (
              <TooltipProvider>
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
                    <p>{strings.TOOLTIPS.ADD_STUDENT}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )} */}
          </div>
        </div>
        <div className="mt-2">
          {" "}
          <MymoduleDataTableByDCNF dcnf_id={dcnf_id} />
        </div>
      </div>
    </>
  );
}
