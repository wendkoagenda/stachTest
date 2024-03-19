export function svgParcer(svgString: string | undefined): SVGElement | null {
  if (svgString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(svgString, "text/xml");
    return doc.getElementsByTagName("svg")[0] as SVGElement;
  } else {
    // Handle the case where svgString is undefined
    // (e.g., return null, throw an error, or display a message)
    return null; // Example: return null if undefined
  }
}
