import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  AlertCircle,
  Frown,
  Hourglass,
  ShieldAlert,
  StopCircle,
  WifiOff,
} from "lucide-react";

export const renderFetchBaseQueryError = (error: FetchBaseQueryError) => {
  let errorMessage = "An error occurred during the request.";
  let icon = <AlertCircle className="h-4 w-4" />;

  if (error.status === 401) {
    errorMessage =
      "You are not authorized to access this resource. Please log in again.";
    icon = <StopCircle className="h-4 w-4" />;
  } else if (error.status === 404) {
    errorMessage = "The requested resource was not found.";
    icon = <Frown className="h-4 w-4" />;
  } else if (error.status === 403) {
    errorMessage = "You have not per,ission to access this resource";
    icon = <ShieldAlert className="h-4 w-4" />;
  } else if (error.status === 500) {
    errorMessage = "An internal server error occurred. Please try again later.";
  } else if (error.status === "FETCH_ERROR") {
    errorMessage = "Erreur Reseaux";
    icon = <WifiOff className="h-4 w-4" />;
  } else if (error.status === "PARSING_ERROR") {
    // souvent de type 500
    errorMessage = "An error happened during parsing";
  } else if (error.status === "CUSTOM_ERROR") {
    errorMessage = "An internal server error occurred. Please try again later.";
  } else if (error.status === "TIMEOUT_ERROR") {
    errorMessage = "Le temps impartie est ecouler";
    icon = <Hourglass className="h-4 w-4" />;
  }

  return (
    <Alert variant="destructive">
      {icon}
      <AlertTitle>Request Error:</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};

export const renderSerializedError = (error: SerializedError) => {
  let errorMessage = "An error occurred during the request.";
  let icon = <AlertCircle className="h-4 w-4" />;
  // Add specific conditions to handle different application errors
  if (error.code === "VALIDATION_ERROR") {
    errorMessage = "Please check your input data and try again.";
    icon = <StopCircle className="h-4 w-4" />;
  } else if (error.code === "BUSINESS_LOGIC_ERROR") {
    errorMessage = "A business logic error occurred. Please contact support.";
    icon = <StopCircle className="h-4 w-4" />;
  } // Add other conditions as needed

  return (
    <Alert variant="destructive">
      {icon}
      <AlertTitle>Application Error:</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};
