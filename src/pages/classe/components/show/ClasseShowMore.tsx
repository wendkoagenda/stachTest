import { ClasseShowModel } from "@/@types/Classe/Classe";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import StudentsListByDCNF from "@/pages/student/StudentsListByDCNF";
import { useFetchClasseByIdQuery } from "@/services/classe";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ClasseShowMore() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  // Declaration des hooks
  // Recuperation du url params
  const { dcnf_uuid } = useParams();
  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const classeShowModel: ClasseShowModel = {
    dcnf_uuid: dcnf_uuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchClasseByIdQuery = useFetchClasseByIdQuery(classeShowModel);

  // Récupération des détails de l'classe au montage du composant
  useEffect(() => {
    fetchClasseByIdQuery.refetch();
  }, []);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const data = fetchClasseByIdQuery.data?.data;

  const isLoading = fetchClasseByIdQuery.isLoading;
  const error = fetchClasseByIdQuery.error;
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            {isLoading ? (
              <TitleSkeleton />
            ) : (
              <>
                <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
                  {data?.nf.filiere.title} {data?.nf.niveau.title} ({" "}
                  {data?.nf.filiere.acronym}
                  {data?.nf.niveau.acronym})
                </h4>
                <p className="">
                  {data?.dc.departement.title} {data?.dc.cycle.title} ({" "}
                  {data?.dc.departement.acronym}
                  {data?.dc.cycle.acronym})
                </p>
              </>
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
          <Tabs defaultValue="students" className="w-full">
            <TabsList>
              <TabsTrigger value="students">{strings.TH.STUDENTS}</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="statistiques">
                {strings.TH.STATISTIQUES}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <StudentsListByDCNF />
            </TabsContent>
            <TabsContent value="modules">Modules</TabsContent>
            <TabsContent value="statistiques">Stats</TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
