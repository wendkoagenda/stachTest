import InConstuction from "@/components/custom/InConstuction";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import { useFetchMyclasseQuery } from "@/services/classe";
import Footer from "../../components/partials/Footer";
import ModulesListByDCNF from "../module/ModulesListByDCNF";

export default function MyyearList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  const fetchMyclasseQuery = useFetchMyclasseQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMyclasseQueryData = fetchMyclasseQuery.data?.data;
  const isLoading = fetchMyclasseQuery.isLoading;
  const myclasse = fetchMyclasseQueryData;

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div>
          {isLoading ? (
            <TitleSkeleton />
          ) : (
            <>
              <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
                {myclasse?.dcnf?.nf?.filiere?.title}{" "}
                {myclasse?.dcnf?.nf?.niveau?.title} ({" "}
                {myclasse?.dcnf?.nf?.filiere?.acronym}
                {myclasse?.dcnf?.nf?.niveau?.acronym})
              </h4>
              <p>
                {myclasse?.dcnf?.dc?.departement?.title}{" "}
                {myclasse?.dcnf?.dc?.cycle?.title} ({" "}
                {myclasse?.dcnf?.dc?.departement?.acronym}
                {myclasse?.dcnf?.dc?.cycle?.acronym})
              </p>
            </>
          )}
        </div>
        <div className="">
          <Tabs defaultValue="modules" className="w-full mt-2">
            <TabsList>
              <TabsTrigger value="modules">{strings.TH.MODULES}</TabsTrigger>
              <TabsTrigger value="exams">{strings.TH.EXAMS}</TabsTrigger>
              <TabsTrigger value="edt">{strings.TH.EDT}</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <ModulesListByDCNF props_dcnf_uuid={myclasse?.dcnf?.uuid} />
            </TabsContent>
            <TabsContent value="exams">
              <InConstuction />
            </TabsContent>
            <TabsContent value="edt">
              <InConstuction />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
