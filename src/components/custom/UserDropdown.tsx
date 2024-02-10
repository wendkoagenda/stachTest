import React from "react";

interface UserDropdownProps {
  open: boolean;
  children: React.ReactElement; // Ajout de la propriété children dans DropdownProps
}

const UserDropdown: React.FC<UserDropdownProps> = ({ children, open }) => {
  return (
    <div className="relative">
      {open && (
        <div className=" absolute top-5 z-10 right-0 w-56 py-2 mt-6 shadow-md bg-white rounded-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
