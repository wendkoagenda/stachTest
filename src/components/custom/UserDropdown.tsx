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
      <Button onClick={toggleDropdown}>
        <CircleUser className="mr-2 h-4 w-4" /> {title}
      </Button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-10 right-0 w-56 py-2 mt-12 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
