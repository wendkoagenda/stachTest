import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { CircleUser } from "lucide-react";

interface DropdownProps {
  children: React.ReactElement;
  title: string;
}

const UserDropdown: React.FC<DropdownProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button className="rounded-full" onClick={toggleDropdown}>
        <CircleUser size={20} className="m-1" /> {title}
      </Button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-10 right-0 w-56 py-2 mt-6 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
