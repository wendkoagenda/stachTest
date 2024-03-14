export function truncateTitle(title: string, length: number) {
  if (title.length > length) {
    return title.substring(0, length) + "...";
  } else {
    return title;
  }
}
