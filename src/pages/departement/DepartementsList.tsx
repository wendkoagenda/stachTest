import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import strings from "@/constants/strings.constant";
import { useFetchDepartementsQuery } from "@/services/departement";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import DepartementDataTable from "./components/DepartementDataTable";

export default function DepartementsList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [dcList, setDCList] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCList(
        permissions.userPermissions.includes(strings.PERMISSIONS.DC_SHOW)
      );
    }
  }, []);

  //*******************Déclaration des Hooks

  //Hook de récupération de la liste des departements (Redux store)
  const fetchDepartementsQuery = useFetchDepartementsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchDepartementsQueryData = fetchDepartementsQuery.data?.data;
  const isLoading = fetchDepartementsQuery.isLoading;
  const departements = Array.isArray(fetchDepartementsQueryData)
    ? fetchDepartementsQueryData
    : [];
  //*******************Fin

  console.log("Liste des dep : ", departements);
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-1">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight flex items-center">
            {strings.TEXTS.LIST_DEPARTEMENT}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(departements) ? (
                departements.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="mt-2">{dcList && <DepartementDataTable />}</div>
      </div>
      <Footer />
    </>
  );
}
