import { ClasseShowModel } from "@/@types/Classe/Classe";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { openStudentCreateDialog } from "@/redux/slices/studentSlice";
import { useFetchClassesByDCNFQuery } from "@/services/classe";
import { useAppDispatch } from "@/utils/hooks/reduxHooks";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { Loader2, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import Footer from "../../components/partials/Footer";
import StudentDataTableByDCNF from "./components/StudentDataTableByDCNF";
import CreationStudentDialog from "./components/creation";

export default function StudentsListByDCNF() {
  //*******************Déclaration de variables de fonctionnement primitives
  // Récupération du token d'accès
  const access_token =
    localStorage.getItem("__kgfwe29__97efiyfcljbf68EF79WEFAD") ??
    "access_token";
  //*******************Fin

  //*******************Politique de gestion des permissons
  // Recuperation des permissions
  const permissions = loadPermissions();
  //Liste des permissions requises
  const studentStore = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_STORE
  );
  const studentList = permissions.userPermissions.includes(
    strings.PERMISSIONS.STUDENT_LIST
  );
  //*******************Fin

  //*******************Déclaration des Hooks
  //Hook de dispatching (Redux store)
  const dispatch = useAppDispatch();

  const { dcnf_uuid } = useParams();
  // Préparation du paramettre du hook de recuperation des détails d'un classes
  const classeShowModel: ClasseShowModel = {
    dcnf_uuid: dcnf_uuid,
    access_token: access_token,
  };

  // Hook de récupération des détails d'un classe (RTK)
  const fetchClassesByDCNFQuery = useFetchClassesByDCNFQuery(classeShowModel);

  //*******************Déclaration d'autres variables
  // Varibles issue du fectch
  const fetchClassesByDCNFQueryData = fetchClassesByDCNFQuery.data?.data;
  const isLoading = fetchClassesByDCNFQuery.isLoading;
  const students = Array.isArray(fetchClassesByDCNFQueryData)
    ? fetchClassesByDCNFQueryData
    : [];
  //*******************Fin

  //*******************Déclaration de fonctions
  // Fonction pour l'ouverture de la boite de dialogue de creation d'un student
  const onCreateClick = () => {
    dispatch(openStudentCreateDialog());
  };
  //*******************Fin

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-6">
          <h4 className="scroll-m-20 text-xl lg:text-2xl font-bold tracking-tight ">
            {strings.TEXTS.LIST_STUDENT} de la classes
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
        <div className="col-6 text-end">
          {studentStore && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button disabled onClick={onCreateClick}>
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
                  <p>{strings.TOOLTIPS.NOT_YET_DISPONIBLE}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <div className="mt-2">{studentList && <StudentDataTableByDCNF />}</div>
      <CreationStudentDialog />
      <Footer />
    </>
  );
}
