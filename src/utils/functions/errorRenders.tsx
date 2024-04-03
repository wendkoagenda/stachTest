import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  AlertCircle,
  ArrowBigRight,
  Frown,
  Hourglass,
  ShieldAlert,
  StopCircle,
  WifiOff,
} from "lucide-react";
interface ValidationError {
  [key: string]: string[];
}

interface ValidationErrors {
  errors: ValidationError;
}
export const renderFetchBaseQueryError = (error: FetchBaseQueryError) => {
  let errorMessage = "An error occurred during the request.";
  let icon = <AlertCircle className="h-4 w-4" />;
  let validationErrors: string[] = [];

  if (error.status === 401) {
    errorMessage =
      "You are not authorized to access this resource. Please log in again.";
    icon = <StopCircle className="h-4 w-4" />;
  } else if (error.status === 400) {
    errorMessage = "Erreur de validation";
    const errorsData = error.data as ValidationErrors;
    const errorMapping: Record<string, string> = {
      email: "Erreur dans l'email.",
      phone1: "Erreur dans le phone1.",
      phone2: "Erreur dans le phone2.",
      // Ajoutez d'autres clés d'erreur ici avec leurs modèles de messages correspondants
    };
    validationErrors = Object.entries(errorsData.errors).flatMap(([key]) => {
      const errorTemplate = errorMapping[key];
      return errorTemplate ? [errorTemplate] : [];
    });

    icon = <Frown className="h-4 w-4" />;
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
      <AlertDescription>
        {errorMessage}
        {validationErrors.length > 0 && (
          <div>
            {validationErrors.map((validationError, index) => (
              <div key={index} className="flex flex-row">
                <ArrowBigRight className="mr-2 h-4 w-4" /> {validationError}
              </div>
            ))}
          </div>
        )}
      </AlertDescription>
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

export const renderSimpleError = (errorMessage: string, title: string) => {
  let icon = <AlertCircle className="h-4 w-4" />;

  icon = <StopCircle className="h-4 w-4" />;
  return (
    <Alert variant="destructive">
      {icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Alert>
  );
};
