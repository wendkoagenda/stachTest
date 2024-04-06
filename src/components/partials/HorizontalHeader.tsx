import logoLightFull from "@/assets/logo/icone_campusFlow_1024.png";
import logoDarkFull from "@/assets/logo/icone_campusFlow_1024_dark.png";
import { Icons } from "@/constants/icons.constant";
import strings from "@/constants/strings.constant";
import { logout } from "@/redux/slices/authSlice";
import loadPermissions from "@/utils/hooks/loadPermissions";
import { LogOut, Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "../custom/UserDropdown";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/mode-toggle";

export default function HorizontalHeader() {
  // Theme management
  const localTheme = localStorage.getItem("vite-ui-theme");
  const logo = localTheme === "dark" ? logoDarkFull : logoLightFull;

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
      <div className="flex fixed w-full h-auto p-3 justify-between border backdrop-blur-lg filter z-50">
        <div className="flex items-center">
          <a href="/" className="flex-shrink-0">
            <img
              src={logo}
              width={30}
              alt="Logo Campus Flow"
              onClick={handleGoToHomePage}
            />
          </a>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Button variant={homeVariant} onClick={handleGoToHomePage}>
              <Icons.Home className="mr-2 h-4 w-4" /> {strings.TEXTS.HOME}
            </Button>

            {paramsUsers && (
              <Button
                variant={userVariant}
                className="hover:font-bold"
                onClick={handleGoToUsersPage}
              >
                <Icons.User className="mr-2 h-4 w-4" /> {strings.TEXTS.USERS}
              </Button>
            )}
            {paramsList && (
              <Button
                variant={paramVariant}
                className="hover:font-bold"
                onClick={handleGoToParamsPage}
              >
                <Icons.Params className="mr-2 h-4 w-4" /> {strings.TH.PARAMS}
              </Button>
            )}
            {paramsDepartements && (
              <Button
                variant={departementVariant}
                className="hover:font-bold"
                onClick={handleGoToDepartementsPage}
              >
                <Icons.Departement className="mr-2 h-4 w-4" />{" "}
                {strings.TH.DEPARTEMENT}
              </Button>
            )}
            {paramsClasses && (
              <Button
                variant={allfinalclassesVariant}
                className="hover:font-bold"
                onClick={handleGoToAllfinalclassesPage}
              >
                <Icons.Classe className="mr-2 h-4 w-4" /> {strings.TH.CLASSES}
              </Button>
            )}
            {myCourses && (
              <Button
                variant={myCoursesVariant}
                className="hover:font-bold"
                onClick={handleGoToMyCoursesPage}
              >
                <Icons.MyCourses className="mr-2 h-4 w-4" />{" "}
                {strings.TH.MY_COURSES}
              </Button>
            )}
            {myYear && (
              <Button
                variant={myYearVariant}
                className="hover:font-bold"
                onClick={handleGoToMyYearPage}
              >
                <Icons.Year className="mr-2 h-4 w-4" /> {strings.TH.MY_YEAR}
              </Button>
            )}
            {/* <div>
              <Dropdown
                title={strings.TH.PARAMS}
                icon={<Icons.Params className="mr-2 h-4 w-4" />}
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
                <UserDropdown last_name={lastName} first_name={firstName}>
                  <>
                    <Button
                      className="w-full rounded-md mb-2 border border-none justify-start"
                      variant="outline"
                      onClick={handleGoToMyAccount}
                    >
                      <Icons.MyAccount className="mr-2 h-4 w-4" />{" "}
                      {strings.TEXTS.MY_ACCOUNT}
                    </Button>
                    <Button
                      className="w-full rounded-md mb-2 border border-none justify-start"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />{" "}
                      {strings.TEXTS.DISCONNECT}
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
              className="flex flex-col bg-slate-200 backdrop-blur-lg filter px-4 py-4"
              ref={menuRef}
            >
              <div className="mb-2">
                <Button variant={homeVariant} onClick={handleGoToHomePage}>
                  <Icons.Home className="mr-2 h-4 w-4" /> {strings.TEXTS.HOME}
                </Button>

                <p>{strings.TEXTS.HOME}</p>
              </div>
              <div className="mb-2">
                {paramsUsers && (
                  <Button
                    variant={userVariant}
                    className="hover:font-bold"
                    onClick={handleGoToUsersPage}
                  >
                    <Icons.User className="mr-2 h-4 w-4" />{" "}
                    {strings.TEXTS.USERS}
                  </Button>
                )}
              </div>
              <div className="mb-2">
                {paramsList && (
                  <Button
                    variant={paramVariant}
                    className="hover:font-bold"
                    onClick={handleGoToParamsPage}
                  >
                    <Icons.Params className="mr-2 h-4 w-4" />{" "}
                    {strings.TH.PARAMS}
                  </Button>
                )}
              </div>
              <div className="mb-2">
                {paramsDepartements && (
                  <Button
                    variant={departementVariant}
                    className="hover:font-bold"
                    onClick={handleGoToDepartementsPage}
                  >
                    <Icons.Departement className="mr-2 h-4 w-4" />{" "}
                    {strings.TH.DEPARTEMENT}
                  </Button>
                )}
              </div>
              <div className="mb-2">
                {paramsClasses && (
                  <Button
                    variant={allfinalclassesVariant}
                    className="hover:font-bold"
                    onClick={handleGoToAllfinalclassesPage}
                  >
                    <Icons.Classe className="mr-2 h-4 w-4" />{" "}
                    {strings.TH.CLASSES}
                  </Button>
                )}
              </div>
              <div className="mb-2">
                {myCourses && (
                  <Button
                    variant={myCoursesVariant}
                    className="hover:font-bold"
                    onClick={handleGoToMyCoursesPage}
                  >
                    <Icons.MyCourses className="mr-2 h-4 w-4" />{" "}
                    {strings.TH.MY_COURSES}
                  </Button>
                )}
              </div>
              <div className="mb-2">
                {myYear && (
                  <Button
                    variant={myYearVariant}
                    className="hover:font-bold"
                    onClick={handleGoToMyYearPage}
                  >
                    <Icons.Year className="mr-2 h-4 w-4" /> {strings.TH.MY_YEAR}
                  </Button>
                )}
              </div>
              <div>
                <div className="flex flex-row">
                  <UserDropdown last_name={lastName} first_name={firstName}>
                    <>
                      <Button
                        className="w-full rounded-md mb-2 border border-none justify-start"
                        variant="outline"
                      >
                        <Icons.MyAccount className="mr-2 h-4 w-4" />{" "}
                        {strings.TEXTS.MY_ACCOUNT}
                      </Button>
                      <Button
                        className="w-full rounded-md mb-2 border border-none justify-start"
                        variant="outline"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />{" "}
                        {strings.TEXTS.DISCONNECT}
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
