import React, { useState, useEffect, useRef } from "react";

interface DropdownProps {
  children: React.ReactElement;
  title: string;
}

const Dropdown: React.FC<DropdownProps> = ({ children, title }) => {
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
      <button
        className="text-gray-700 hover:font-bold"
        onClick={toggleDropdown}
      >
        {title}
      </button>
      {isOpen && (
        <div className="absolute top-0 left-0 z-10 right-0 w-56 py-2 mt-6 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
