export function dateFormater(dateTimeNotFormated: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const date = new Date(dateTimeNotFormated);
  return new Intl.DateTimeFormat("fr-FR", options).format(date);
}
