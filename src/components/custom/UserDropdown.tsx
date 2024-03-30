import ProfileImage from "@/pages/myaccount/components/ProfileImage";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

interface DropdownProps {
  children: React.ReactElement;
  last_name: string;
  first_name: string;
}

const UserDropdown: React.FC<DropdownProps> = ({
  children,
  last_name,
  first_name,
}) => {
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
        <ProfileImage
          first_name={first_name}
          last_name={last_name}
          class_name="mr-2 h-6 w-6 rounded-full flex items-center justify-center bg-red-500 text-white text-xs "
        />{" "}
        {last_name + " " + first_name}
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
