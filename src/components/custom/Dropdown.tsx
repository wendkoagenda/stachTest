import React from "react";

interface DropdownProps {
  open: boolean;
  children: React.ReactElement; // Ajout de la propriété children dans DropdownProps
}

const Dropdown: React.FC<DropdownProps> = ({ children, open }) => {
  return (
    <div className="relative">
      {open && (
        <div className=" absolute top-0 left-0  z-10 right-0 w-56 py-2 mt-6 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
