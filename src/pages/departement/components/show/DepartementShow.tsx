import { DepartementShowModel } from "@/@types/Departement/Departement";
import GoBackButton from "@/components/custom/GoBackButton";
import InConstuction from "@/components/custom/InConstuction";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import ClassesListByDepartement from "@/pages/classe/components/List/ClassesListByDepartement";
import { useFetchDepartementByIdQuery } from "@/services/departement";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { CornerUpLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function DepartementShow() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [dcList, setDCList] = useState(false);
  const [stats, setStats] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setDCList(
        permissions.userPermissions.includes(strings.PERMISSIONS.DC_SHOW)
      );
      setStats(permissions.userPermissions.includes(strings.PERMISSIONS.STATS));
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de recuperation du param dans l'url
  const { dc_uuid } = useParams();

  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const departementShowModel: DepartementShowModel = {
    dc_uuid: dc_uuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchDepartementByIdQuery =
    useFetchDepartementByIdQuery(departementShowModel);

  // Récupération des détails de l'classe au montage du composant
  useEffect(() => {
    fetchDepartementByIdQuery.refetch();
  }, [dc_uuid]);
  //*******************Fin
  //*******************Déclaration d'autres variables
  const data = fetchDepartementByIdQuery.data;
  const isLoading = fetchDepartementByIdQuery.isFetching;

  //*******************Fin
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="md:grid md:grid-cols-1 md:gap-4 grid grid-cols-1 gap-1">
          <div>
            {isLoading ? (
              <TitleSkeleton />
            ) : (
              <div className="flex felx-col">
                <GoBackButton />
                <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
                  {data?.data.departement.title} {data?.data.cycle.title} ({" "}
                  {data?.data.departement.acronym}
                  {data?.data.cycle.acronym})
                </h4>
              </div>
            )}
          </div>
        </div>
        <div className="mt-2">
          <Tabs defaultValue="classes" className="w-full">
            <TabsList>
              {dcList && (
                <TabsTrigger value="classes">{strings.TH.CLASSES}</TabsTrigger>
              )}
              {stats && (
                <TabsTrigger value="stats">{strings.TH.STATISTICS}</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="classes">
              <ClassesListByDepartement dc_uuid={dc_uuid} />
            </TabsContent>
            <TabsContent value="stats">
              <InConstuction />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
