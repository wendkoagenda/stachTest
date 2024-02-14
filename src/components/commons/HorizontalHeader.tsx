import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../custom/Dropdown";
import UserDropdown from "../custom/UserDropdown";
import { ModeToggle } from "../ui/mode-toggle";

export default function HorizontalHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <>
      <div className="flex fixed w-full h-auto p-3 justify-between border border-cyan-600 backdrop-blur-lg filter ">
        <div className="flex items-center">
          <a href="/" className="flex-shrink-0">
            <img className="h-8 w-8" src="logo.svg" alt="Logo" />
          </a>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Link to="/" className="text-gray-700 font-bold">
                    Home
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Page d'accueil</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {" "}
                  <Link to="/" className="text-gray-700 hover:font-bold">
                    A propos
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Page A propos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div>
              <Dropdown title="Kioque">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Option 1
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden  sm:block">
            <div className="flex flex-row">
              <div>
                <UserDropdown title="OUEDRAOGO">
                  <>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon compte
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Me deconnecter
                    </a>
                  </>
                </UserDropdown>
              </div>
              <div>
                <ModeToggle />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
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
                      {" "}
                      <Link to="/" className="text-gray-700 font-bold">
                        Home
                      </Link>
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
                      {" "}
                      <Link to="/" className="text-gray-700 hover:font-bold">
                        A propos
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Page A propos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="mb-2">
                <Dropdown title="Kioque">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Option 1
                  </a>
                </Dropdown>
              </div>
              <div>
                <Dropdown title="OUEDRAOGO">
                  <>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Mon compte
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Me déconnecter
                    </a>
                  </>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
