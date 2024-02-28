import { ClasseShowModel } from "@/@types/Classe/Classe";
import { DepartementShowModel } from "@/@types/Departement/Departement";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import ClassesList from "@/pages/classe/components/List/ClassesList";
import ClassesListByDepartement from "@/pages/classe/components/List/ClassesListByDepartement";
import ClasseDataTable from "@/pages/classe/components/dataTable/ClasseDataTableByDepartement";
import { useFetchDepartementByIdQuery } from "@/services/departement";
import { useAppSelector } from "@/utils/hooks/reduxHooks";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DepartementShow() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
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
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            {isLoading ? (
              <TitleSkeleton />
            ) : (
              <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
                {data?.data.departement.title} {data?.data.cycle.title} ({" "}
                {data?.data.departement.acronym}
                {data?.data.cycle.acronym})
              </h4>
            )}
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
          <Tabs defaultValue="classes" className="w-full">
            <TabsList>
              <TabsTrigger value="classes">{strings.TH.CLASSES}</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="classes">
              <ClassesListByDepartement dc_uuid={dc_uuid} />
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
