import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useEffect, useState } from "react";
import Footer from "../../components/partials/Footer";
import Personals from "./components/Personals";
import AgentInformations from "./components/AgentInformations";
import TeacherInformations from "./components/TeacherInformations";
import StudentInformations from "./components/StudnetInformations";

export default function MyyearList() {
  //*******************Déclaration de variables de fonctionnement primitives
  //Liste des permissions requises

  const [myUserInformation, setMyUserInformations] = useState(false);
  const [myStudentInformation, setMyStudentInformations] = useState(false);
  const [myTeacherInformation, setMyTeacherInformations] = useState(false);
  const [myAgentInformation, setMyAgentInformations] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setMyStudentInformations(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.MY_STUDENT_INFORMATION
        )
      );
      setMyTeacherInformations(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.MY_TEACHER_INFORMATION
        )
      );
      setMyAgentInformations(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.MY_AGENT_INFORMATION
        )
      );
      setMyUserInformations(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.MY_USER_INFORMATION
        )
      );
    }
  }, []);

  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.MY_ACCOUNT}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="personals" className="w-full mt-2">
            <TabsList>
              {myUserInformation && (
                <TabsTrigger value="personals">
                  {strings.TH.PERSONAL_INFO}
                </TabsTrigger>
              )}
              {myAgentInformation && (
                <TabsTrigger value="dossier_agent">
                  {strings.TH.DOSSIER_AGENT}
                </TabsTrigger>
              )}
              {myTeacherInformation && (
                <TabsTrigger value="dossier_teacher">
                  {strings.TH.DOSSIER_TEACHER}
                </TabsTrigger>
              )}
              {myStudentInformation && (
                <TabsTrigger value="dossier_student">
                  {strings.TH.DOSSIER_STUDENT}
                </TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="personals">
              <Personals />
            </TabsContent>
            <TabsContent value="dossier_agent">
              <AgentInformations />
            </TabsContent>
            <TabsContent value="dossier_teacher">
              <TeacherInformations />
            </TabsContent>
            <TabsContent value="dossier_student">
              <StudentInformations />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
