import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import AgentsList from "../agent";
import StudentsList from "../student";
import TeachersList from "../teacher";
import { useEffect, useState } from "react";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Button } from "@/components/ui/button";
import { CornerUpLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  //Liste des permissions requises
  const [agentUserList, setAgentUserList] = useState(false);
  const [teacherUserList, setTeacherUserList] = useState(false);
  const [studentUserList, setStudentUserList] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.AGENT_USER_LIST
        )
      );
      setTeacherUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.AGENT_USER_LIST
        )
      );
      setStudentUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.AGENT_USER_LIST
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
            {strings.TEXTS.USERS}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="agent" className="w-full">
            <TabsList>
              {agentUserList && (
                <TabsTrigger value="agent"> {strings.TH.AGENT}</TabsTrigger>
              )}
              {teacherUserList && (
                <TabsTrigger value="teacher"> {strings.TH.TEACHER}</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="agent">
              <AgentsList />
            </TabsContent>
            <TabsContent value="teacher">
              <TeachersList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
