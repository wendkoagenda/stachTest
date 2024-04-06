import HorizontalHeader from "@/components/partials/HorizontalHeader";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openStudentCreateDialog } from "@/redux/slices/studentSlice";
import { useFetchStudentsQuery } from "@/services/student";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import { Loader2, Plus } from "lucide-react";
import Footer from "../../components/partials/Footer";
import StudentDataTable from "./components/StudentDataTable";
import CreationStudentDialog from "./components/creation";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { useEffect, useState } from "react";
import { Icons } from "@/constants/icons.constant";

export default function StudentsList() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin
  const [studentUserList, setAgentUserList] = useState(false);
  const [studentStore, setAgentStore] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setAgentUserList(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.STUDENT_USER_LIST
        )
      );
      setAgentStore(
        permissions.userPermissions.includes(strings.PERMISSIONS.STUDENT_STORE)
      );
    }
  }, []);

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  //Hook de récupération de la liste des students (Redux store)
  const fetchStudentsQuery = useFetchStudentsQuery(access_token);
  //*******************Fin

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchStudentsQueryData = fetchStudentsQuery.data?.data;
  const isLoading = fetchStudentsQuery.isLoading;
  const students = Array.isArray(fetchStudentsQueryData)
    ? fetchStudentsQueryData
    : [];
  //*******************Fin

  return (
    <>
      {/* <HorizontalHeader /> */}
      <div className="w-full mx-auto ">
        {/* <div className="w-full mx-auto py-24 px-6 sm:py-24 sm:px-6 md:py-24 md:px-8 lg:py-24 lg:px-12 xl:py-24 xl:px-12"> */}
        <div className="md:grid md:grid-cols-1 md:gap-4 grid grid-cols-1 gap-1">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.LIST_STUDENT}
            <Button className="ml-2" style={{ pointerEvents: "none" }}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : Array.isArray(students) ? (
                students.length
              ) : (
                0
              )}
            </Button>
          </h4>
        </div>
        <div className="mt-2">{studentUserList && <StudentDataTable />}</div>
      </div>
      <CreationStudentDialog />
      <Footer />
    </>
  );
}
