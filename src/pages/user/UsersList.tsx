import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import AgentsList from "../agent";
import StudentsList from "../student";
import TeachersList from "../teacher";

export default function UsersList() {
  5;
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.USERS}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="agent" className="w-full">
            <TabsList>
              <TabsTrigger value="agent"> {strings.TH.AGENT}</TabsTrigger>
              <TabsTrigger value="teacher"> {strings.TH.TEACHER}</TabsTrigger>
              <TabsTrigger value="student">{strings.TH.STUDENT}</TabsTrigger>
            </TabsList>
            <TabsContent value="agent">
              <AgentsList />
            </TabsContent>
            <TabsContent value="teacher">
              <TeachersList />
            </TabsContent>
            <TabsContent value="student">
              <StudentsList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
