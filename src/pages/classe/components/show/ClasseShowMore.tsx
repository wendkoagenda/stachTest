import { ClasseShowModel } from "@/@types/Classe/Classe";
import GoBackButton from "@/components/custom/GoBackButton";
import InConstuction from "@/components/custom/InConstuction";
import TitleSkeleton from "@/components/custom/skeleton/TitleSkeleton";
import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import ModulesListByDCNF from "@/pages/module/ModulesListByDCNF";
import StudentsListByDCNF from "@/pages/student/StudentsListByDCNF";
import { useFetchClasseByIdQuery } from "@/services/classe";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { CornerUpLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ClasseShowMore() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  //Liste des permissions requises
  const [studentUserList, setStudentUserList] = useState(false);
  const [dcnfsumList, setDCNFSUMList] = useState(false);
  const [stats, setStats] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setStudentUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_USER_LIST
        )
      );
      setDCNFSUMList(
        permissions.userPermissions.includes(strings.PERMISSIONS.DCNFSUM_LIST)
      );
      setStats(permissions.userPermissions.includes(strings.PERMISSIONS.STATS));
    }
  }, []);

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
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="flex felx-row mb-4">
          {isLoading ? (
            <TitleSkeleton />
          ) : (
            <div className="flex felx-col">
              <GoBackButton />
              <div>
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
              </div>
              {/*  */}
            </div>
          )}
        </div>
        <div className="mt-2">
          <Tabs defaultValue="students" className="w-full">
            <TabsList>
              {studentUserList && (
                <TabsTrigger value="students">
                  {strings.TH.STUDENTS}
                </TabsTrigger>
              )}
              {dcnfsumList && (
                <TabsTrigger value="modules">{strings.TH.MODULES}</TabsTrigger>
              )}
              <TabsTrigger value="exams">{strings.TH.EXAMS}</TabsTrigger>
              {/* On verra  */}
              {/* <TabsTrigger value="edt">{strings.TH.EDT}</TabsTrigger>
              {stats && (
                <TabsTrigger value="statistiques">
                  {strings.TH.STATISTICS}
                </TabsTrigger>
              )} */}
            </TabsList>
            <TabsContent value="students">
              <StudentsListByDCNF />
            </TabsContent>
            <TabsContent value="modules">
              <ModulesListByDCNF />
            </TabsContent>
            <TabsContent value="exams">
              <InConstuction />
            </TabsContent>
            {/* On verra  */}
            {/* <TabsContent value="edt">
              <InConstuction />
            </TabsContent> */}
            {/* <TabsContent value="statistiques">
              <InConstuction />
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
