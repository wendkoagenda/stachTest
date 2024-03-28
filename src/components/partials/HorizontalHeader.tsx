import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import strings from "@/constants/strings.constant";
import { logout } from "@/redux/slices/authSlice";
import loadPermissions from "@/utils/hooks/loadPermissions";
import {
  Album,
  Bolt,
  Diamond,
  Home,
  Key,
  LogOut,
  Menu,
  Option,
  Settings2,
  User,
  User2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Dropdown from "../custom/Dropdown";
import UserDropdown from "../custom/UserDropdown";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function HorizontalHeader() {
  const firstName = localStorage.getItem("first_name") ?? "Opps";
  const lastName = localStorage.getItem("last_name") ?? "Opps";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //Liste des permissions requises

  const [paramsList, setParamsList] = useState(false);
  const [paramsClasses, setParamsClasses] = useState(false);
  const [myCourses, setMyCourses] = useState(false);
  const [paramsDepartements, setParamsDepartements] = useState(false);
  const [paramsUsers, setParamsUsers] = useState(false);
  const [myYear, setMyYear] = useState(false);

  // Utilisez le crochet "loadPermissions" directement dans le corps du composant
  useEffect(() => {
    // Utilisez la fonction loadPermissions pour récupérer les autorisations
    const permissions = loadPermissions();
    // Mettre à jour les états des autorisations
    if (permissions) {
      setParamsList(
        permissions.userPermissions.includes(strings.PERMISSIONS.PARAMS_LIST)
      );
      setParamsClasses(
        permissions.userPermissions.includes(strings.PERMISSIONS.PARAMS_CLASSES)
      );
      setMyCourses(
        permissions.userPermissions.includes(strings.PERMISSIONS.MY_COURSES)
      );
      setParamsDepartements(
        permissions.userPermissions.includes(
          strings.PERMISSIONS.PARAMS_DEPARTEMENTS
        )
      );
      setParamsUsers(
        permissions.userPermissions.includes(strings.PERMISSIONS.PARAMS_USERS)
      );
      setMyYear(
        permissions.userPermissions.includes(strings.PERMISSIONS.MY_YEAR)
      );
    }
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (menuRef.current && !(menuRef.current as any).contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Url de la page courante
  const location = useLocation();
  const currentURL = location.pathname;
  // console.log("current URL", currentURL);

  enum ButtonVariant {
    Outline = "outline",
    Default = "default",
    Link = "link",
    Destructive = "destructive",
    Secondary = "secondary",
    Ghost = "ghost",
  }
  const [homeVariant, setHomeVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [userVariant, setUserVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [paramVariant, setParamVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [departementVariant, setDepartementVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [allfinalclassesVariant, setAllfinalclassesVariant] =
    useState<ButtonVariant>(ButtonVariant.Outline);

  const [myCoursesVariant, setMyCoursesVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [myYearVariant, setMyYearVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );

  useEffect(() => {
    if (currentURL === "/") {
      setHomeVariant(ButtonVariant.Default);
    } else if (currentURL === "/users") {
      setUserVariant(ButtonVariant.Default);
    } else if (currentURL === "/settings") {
      setParamVariant(ButtonVariant.Default);
    } else if (
      currentURL === "/departements" ||
      currentURL.startsWith("/departement/")
    ) {
      setDepartementVariant(ButtonVariant.Default);
    } else if (
      currentURL === "/allfinalclasses" ||
      currentURL.startsWith("/classe/")
    ) {
      setAllfinalclassesVariant(ButtonVariant.Default);
    } else if (currentURL === "/mycourses") {
      setMyCoursesVariant(ButtonVariant.Default);
    } else if (currentURL === "/myyear") {
      setMyYearVariant(ButtonVariant.Default);
    }
  }, [currentURL, ButtonVariant.Default]);

  const handleGoToHomePage = () => {
    setParamVariant(ButtonVariant.Outline);
    navigate("/");
  };
  const handleGoToUsersPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/users");
  };
  const handleGoToDepartementsPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/departements");
  };
  const handleGoToParamsPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/settings");
  };
  const handleGoToAllfinalclassesPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/allfinalclasses");
  };
  const handleGoToMyCoursesPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/mycourses");
  };
  const handleGoToMyYearPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/myyear");
  };
  const handleGoToMyAccount = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/myaccount");
  };

  return (
    <>
      <div className="flex fixed w-full h-auto p-3 justify-between border border-cyan-600 backdrop-blur-lg filter z-50">
        <div className="flex items-center">
          <a href="/" className="flex-shrink-0">
            <img className="h-8 w-8" src="logo.svg" alt="Logo" />
          </a>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={homeVariant} onClick={handleGoToHomePage}>
                    <Home className="mr-2 h-4 w-4" /> Home
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Page d'accueil</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            {paramsUsers && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={userVariant}
                      className="hover:font-bold"
                      onClick={handleGoToUsersPage}
                    >
                      <User2 className="mr-2 h-4 w-4" /> {strings.TEXTS.USERS}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.USERS_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {paramsList && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={paramVariant}
                      className="hover:font-bold"
                      onClick={handleGoToParamsPage}
                    >
                      <Settings2 className="mr-2 h-4 w-4" /> {strings.TH.PARAMS}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.PARAMS_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {paramsDepartements && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={departementVariant}
                      className="hover:font-bold"
                      onClick={handleGoToDepartementsPage}
                    >
                      <Bolt className="mr-2 h-4 w-4" /> {strings.TH.DEPARTEMENT}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.PARAMS_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {paramsClasses && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={allfinalclassesVariant}
                      className="hover:font-bold"
                      onClick={handleGoToAllfinalclassesPage}
                    >
                      <Diamond className="mr-2 h-4 w-4" /> {strings.TH.CLASSES}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.CLASSE_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {myCourses && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={myCoursesVariant}
                      className="hover:font-bold"
                      onClick={handleGoToMyCoursesPage}
                    >
                      <Diamond className="mr-2 h-4 w-4" />{" "}
                      {strings.TH.MY_COURSES}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.CLASSE_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {myYear && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant={myYearVariant}
                      className="hover:font-bold"
                      onClick={handleGoToMyYearPage}
                    >
                      <Album className="mr-2 h-4 w-4" /> {strings.TH.MY_YEAR}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{strings.TOOLTIPS.CLASSE_LIST}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            {/* <div>
              <Dropdown
                title={strings.TH.PARAMS}
                icon={<Settings2 className="mr-2 h-4 w-4" />}
              >
                <Button
                  className="w-full rounded-md mb-2 border border-none justify-start"
                  variant="outline"
                  onClick={handleGoToDepartementsPage}
                >
                  <Option className="mr-2 h-4 w-4" /> Departement
                  <Option
                    className="mr-2 h-4 w-4"
                    onClick={handleGoToModulesPage}
                  />{" "}
                  Module
                </Button>
              </Dropdown>
            </div> */}
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden  sm:block">
            <div className="flex flex-row ">
              <div>
                <UserDropdown title={lastName + " " + firstName}>
                  <>
                    <Button
                      className="w-full rounded-md mb-2 border border-none justify-start"
                      variant="outline"
                      onClick={handleGoToMyAccount}
                    >
                      <User className="mr-2 h-4 w-4" /> Mon compte
                    </Button>
                    <Button
                      className="w-full rounded-md mb-2 border border-none justify-start"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" /> Me deconnecter
                    </Button>
                  </>
                </UserDropdown>
              </div>
              <div className="ml-1">
                <ModeToggle />
              </div>
            </div>
          </div>
          {/* For mobile  */}
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <Menu />
            </button>
          </div>
          <div
            className={`absolute z-10 top-0 left-0 w-full sm:hidden ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <div
              className="flex flex-col border border-red-900 bg-slate-200 backdrop-blur-lg filter px-4 py-4"
              ref={menuRef}
            >
              <div className="mb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline">
                        <Home className="mr-2 h-4 w-4" /> Home
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Page d'accueil</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mb-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Button variant="outline">
                        <User2 className="mr-2 h-4 w-4" /> Utilisateurs
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Liste des utilisateurs</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mb-2">
                <Dropdown
                  title="Kioque"
                  icon={<Key className="mr-2 h-4 w-4" />}
                >
                  <Button
                    className="w-full rounded-md mb-2 border border-none justify-start"
                    variant="outline"
                  >
                    <Option className="mr-2 h-4 w-4" /> Option 1
                  </Button>
                </Dropdown>
              </div>
              <div>
                <div className="flex flex-row">
                  <UserDropdown title="OUEDRAOGO">
                    <>
                      <Button
                        className="w-full rounded-md mb-2 border border-none justify-start"
                        variant="outline"
                      >
                        <User className="mr-2 h-4 w-4" /> Mon compte
                      </Button>
                      <Button
                        className="w-full rounded-md mb-2 border border-none justify-start"
                        variant="outline"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" /> Me deconnecter
                      </Button>
                    </>
                  </UserDropdown>
                </div>
                <div>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
