import InConstuction from "@/components/custom/InConstuction";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import Footer from "../../components/partials/Footer";
import MyclassesList from "../classe/components/List/MyclassesList";
import MymodulesList from "../module/MymodulesList";

export default function UsersList() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div>
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight mt-2">
            {strings.TH.MY_COURSES}
          </h4>
        </div>
        <div className="">
          <Tabs defaultValue="myclasses" className="w-full">
            <TabsList>
              <TabsTrigger value="myclasses">
                {strings.TH.MY_CLASSES}
              </TabsTrigger>
              <TabsTrigger value="mymodules">
                {strings.TH.MY_MODULES}
              </TabsTrigger>
              <TabsTrigger value="myedt">{strings.TH.MY_EDT}</TabsTrigger>
              <TabsTrigger value="mydocs">{strings.TH.MY_DOCS}</TabsTrigger>
              <TabsTrigger value="mystats">{strings.TH.MY_STATS}</TabsTrigger>
            </TabsList>
            <TabsContent value="myclasses">
              <MyclassesList />
            </TabsContent>
            <TabsContent value="mymodules">
              <MymodulesList />
            </TabsContent>
            <TabsContent value="myedt">
              <InConstuction />
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
