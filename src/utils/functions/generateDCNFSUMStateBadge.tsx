import { Badge } from "@/components/ui/badge";

export function genererBadgeStatut(statut: string) {
  switch (statut) {
    case "completed":
      return <Badge variant="default">Terminer</Badge>;
    case "inProgress":
      return <Badge variant="default">En cours</Badge>;
    case "notAssigned":
      return <Badge variant="destructive">Non assigner</Badge>;
    default:
      return <Badge variant="default">Statut inconnu</Badge>;
  }
}
