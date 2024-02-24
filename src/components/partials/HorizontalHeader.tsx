import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logout } from "@/redux/slices/authSlice";
import {
  Home,
  Key,
  LogOut,
  Menu,
  Option,
  SquareUser,
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
  const [agentVariant, setAgentVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );
  const [studentVariant, setStudentVariant] = useState<ButtonVariant>(
    ButtonVariant.Outline
  );

  useEffect(() => {
    if (currentURL === "/") {
      setHomeVariant(ButtonVariant.Default);
    } else if (currentURL === "/agents") {
      setAgentVariant(ButtonVariant.Default);
    } else if (currentURL === "/students") {
      setStudentVariant(ButtonVariant.Default);
    }
  }, [currentURL, ButtonVariant.Default]);

  const handleGoToHomePage = () => {
    setAgentVariant(ButtonVariant.Outline);
    navigate("/");
  };
  const handleGoToUsersPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/agents");
  };
  const handleGoToStudentsPage = () => {
    setHomeVariant(ButtonVariant.Outline);
    navigate("/students");
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant={agentVariant} onClick={handleGoToUsersPage}>
                    <User2 className="mr-2 h-4 w-4" /> Agents
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Liste des Agents</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant={studentVariant}
                    onClick={handleGoToStudentsPage}
                  >
                    <SquareUser className="mr-2 h-4 w-4" /> Etudiants
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Liste des Etudiants</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <Dropdown title="Kioque" icon={<Key className="mr-2 h-4 w-4" />}>
                <Button
                  className="w-full rounded-md mb-2 border border-none justify-start"
                  variant="outline"
                >
                  <Option className="mr-2 h-4 w-4" /> Option 1
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden  sm:block">
            <div className="flex flex-row ">
              <div>
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
