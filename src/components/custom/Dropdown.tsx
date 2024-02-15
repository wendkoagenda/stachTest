import React, { useState, useEffect, useRef, ReactElement } from "react";
import { Button } from "../ui/button";

interface DropdownProps {
  children: React.ReactElement;
  title: string;
  icon?: ReactElement;
}

const Dropdown: React.FC<DropdownProps> = ({ children, title, icon }) => {
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
      <Button
        className="hover:font-bold"
        variant="outline"
        onClick={toggleDropdown}
      >
        {icon && icon}
        {title}
      </Button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-10 right-0 w-56 py-2 mt-12 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
