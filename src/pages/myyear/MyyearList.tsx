import InConstuction from "@/components/custom/InConstuction";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import MyclassesList from "../classe/components/List/MyclassesList";
import MymodulesList from "../module/MymodulesList";
import { useFetchMyclasseQuery } from "@/services/classe";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
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
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
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
          <Tabs defaultValue="modules" className="w-full">
            <TabsList>
              <TabsTrigger value="modules">{strings.TH.MODULES}</TabsTrigger>
              <TabsTrigger value="mymodules">
                {strings.TH.MY_MODULES}
              </TabsTrigger>
              <TabsTrigger value="mydocs">{strings.TH.MY_DOCS}</TabsTrigger>
              <TabsTrigger value="mystats">{strings.TH.MY_STATS}</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <ModulesListByDCNF props_dcnf_uuid={myclasse?.dcnf?.uuid} />
            </TabsContent>
            <TabsContent value="mymodules">
              <MymodulesList />
            </TabsContent>
            <TabsContent value="mydocs">
              <InConstuction />
            </TabsContent>
            <TabsContent value="mystats">
              <InConstuction />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
