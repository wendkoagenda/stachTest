import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import strings from "@/constants/strings.constant";
import StudentsListByDCNF from "@/pages/student/StudentsListByDCNF";

export default function ClasseShowMore() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              Non de la classe
              {/* <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(departements) ? (
                  departements.length
                ) : (
                  0
                )}
              </Button> */}
            </h4>
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
              <TabsTrigger value="password">
                {strings.TH.STATISTIQUES}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="students">
              <StudentsListByDCNF />
            </TabsContent>
            <TabsContent value="password">Stats</TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
}
