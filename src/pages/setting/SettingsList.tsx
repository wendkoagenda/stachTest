import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import ModulesList from "../module";

export default function SettingsList() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.SETTINGS}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="modules" className="w-full">
            <TabsList>
              <TabsTrigger value="modules"> {strings.TH.MODULE}</TabsTrigger>
            </TabsList>
            <TabsContent value="modules">
              <ModulesList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
