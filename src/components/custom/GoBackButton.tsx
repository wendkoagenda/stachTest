import React from "react";
import { Button } from "../ui/button";
import { CornerUpLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  // Pour le retour en arriere
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="mr-2"
      onClick={handleGoBack}
    >
      <CornerUpLeft className="mr-2 h-4 w-4" />
    </Button>
  );
}
