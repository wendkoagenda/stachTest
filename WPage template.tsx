import Footer from "@/components/partials/Footer";
import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import strings from "@/constants/strings.constant";
import { Loader2 } from "lucide-react";

export default function DepartementShow() {
  return (
    <>
      <HorizontalHeader />
      <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.LIST_DEPARTEMENT}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(departements) ? (
                  departements.length
                ) : (
                  0
                )}
              </Button>
            </h4>
          </div>
          <div className="col-6 text-end">
            {/* {departementStore && (
          
            
              
                <Button onClick={onCreateClick}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Plus /> <span>{strings.BUTTONS.ADD}</span>
                    </>
                  )}
                </Button>
              
             
                <p>{strings.TOOLTIPS.ADD_STUDENT}</p>
             
            
          
        )} */}
          </div>
        </div>
        <div className="mt-2">
          {departementList && <DepartementDataTable />}
        </div>
      </div>
      <Footer />
    </>
  );
}

// Por le titre
<div className="md:grid md:grid-cols-2 md:gap-4 grid grid-cols-1 gap-1"></div>;
