import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openTeacherCreateDialog } from "@/redux/slices/teacherSlice";
import { useFetchTeachersQuery } from "@/services/teacher";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import Footer from "../../components/partials/Footer";
import TeacherDataTable from "./components/TeacherDataTable";
import CreationTeacherDialog from "./components/creation";
import { useEffect, useState } from "react";

export default function TeachersList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  const [teacherUserList, setAgentUserList] = useState(false);
  const [teacherStore, setAgentStore] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.TEACHER_USER_LIST
        )
      );
      setAgentStore(
        permissions.userPermissions.includes(strings.PERMISSIONS.TEACHER_STORE)
      );
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des teachers (Redux store)
  const fetchTeachersQuery = useFetchTeachersQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchTeachersQueryData = fetchTeachersQuery.data?.data;
  const isLoading = fetchTeachersQuery.isLoading;
  const teachers = Array.isArray(fetchTeachersQueryData)
    ? fetchTeachersQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un teacher
  const onCreateClick = () => {
    dispatch(openTeacherCreateDialog());
  };
  //*******************Fin

  return (
    <>
      {/* <HorizontalHeader /> */}
      <div className="w-full mx-auto">
        {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12"> */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-6">
            <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
              {strings.TEXTS.LIST_TEACHER}
              <Button className="ml-2" style={{ pointerEvents: "none" }}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : Array.isArray(teachers) ? (
                  teachers.length
                ) : (
                  0
                )}
              </Button>
            </h4>
          </div>
          <div className="col-6 text-end">
            {teacherStore && (
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
                    <p>{strings.TOOLTIPS.ADD_TEACHER}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
        <div className="mt-2">{teacherUserList && <TeacherDataTable />}</div>
      </div>
      <CreationTeacherDialog />
      <Footer />
    </>
  );
}
