import { Button } from "@/components/ui/button";
import strings from "@/constants/strings.constant";
import { useFetchMymodulesQuery } from "@/services/module";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2 } from "lucide-react";
import MymoduleDataTable from "./components/MymoduleDataTable";

export default function MymodulesList() {
  //*******************Déclaration de variables de fonctionnement primitivesniveau
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  const fetchMymodulesQuery = useFetchMymodulesQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchMymodulesQueryData = fetchMymodulesQuery.data?.data;
  const isLoading = fetchMymodulesQuery.isLoading;
  const mymodules = Array.isArray(fetchMymodulesQueryData)
    ? fetchMymodulesQueryData
    : [];
  //*******************Fin

  //*******************Fin
  return (
    <>
      {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12 border border-gray-300"> */}
      <div className="w-full mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.MY_MODULES_LIST}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(mymodules) ? (
                  mymodules.length
                ) : (
                  0
                )}
              </Button>
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
          {" "}
          <MymoduleDataTable />
        </div>
      </div>
    </>
  );
}
