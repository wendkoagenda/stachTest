import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import Dropdown from "../custom/Dropdown";
import UserDropdown from "../custom/UserDropdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function VerticalHeader() {
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
      {isMenuOpen ? (
        <div
          className="flex flex-col fixed h-full justify-between border border-cyan-600 backdrop-blur-lg filter p-3"
          ref={menuRef}
        >
          <div className="flex flex-col" ref={menuRef}>
            <a href="/" className="flex-shrink-0">
              <img className="h-8 w-8" src="logo.svg" alt="Logo" />
            </a>
            <div className="flex flex-col mt-6 space-y-2">
              <Link to="/" className="text-gray-700 font-bold">
                Home
              </Link>
              <Link to="/" className="text-gray-700 hover:font-bold">
                A propos
              </Link>
              <Dropdown title="Kioque">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Option 1
                </a>
              </Dropdown>
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
          </div>
        </div>
      ) : (
        <div className="flex fixed w-full h-auto p-3 justify-between border border-cyan-600 backdrop-blur-lg filter items-center">
          <div className="flex items-center">
            <button
              className="inline-flex items-start justify-start p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggleMenu}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center flex-grow">
            <a href="/">
              <img className="h-8 w-8" src="logo.svg" alt="Logo" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
