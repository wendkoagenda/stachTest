import { Badge } from "@/components/ui/badge";

export function genererBadgeStatut(statut: string) {
  switch (statut) {
    case "inProgress":
      return <Badge variant="default">En cours</Badge>;
    case "notAssigned":
      return <Badge variant="destructive">Non assigner</Badge>;
    case "Assigned":
      return <Badge variant="default">Assigner</Badge>;
    default:
      return <Badge variant="default">Statut inconnu</Badge>;
  }
}
