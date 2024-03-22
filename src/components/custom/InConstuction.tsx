import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Construction } from "lucide-react";

export default function InConstuction() {
  return (
    <Alert className="bg bg-orange-200">
      <Construction className="h-4 w-4" />
      <AlertTitle>Oupps !</AlertTitle>
      <AlertDescription>
        Ce contenu est en cours de construction ...
      </AlertDescription>
    </Alert>
  );
}
