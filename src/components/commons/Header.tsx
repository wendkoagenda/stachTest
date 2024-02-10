import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../custom/Dropdown";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
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
              <Dropdown open={isOpen}>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Option 1
                </a>
              </Dropdown>
              <button
                className="text-gray-700 hover:font-bold"
                onClick={toggleDropdown}
              >
                Dropdown menu
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden sm:block">
            <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Connexion
            </button>
            <button className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Inscription
            </button>
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
            <div className="flex flex-col bg-gray-400 opacity-95 px-4 py-4">
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
                <Dropdown open={isOpen}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Option 1
                  </a>
                </Dropdown>
                <button
                  className="text-gray-700 hover:font-bold"
                  onClick={toggleDropdown}
                >
                  Dropdown menu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
