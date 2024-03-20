export function svgParcer(svgString: string | undefined) {
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: svgString || "" }} />
    </div>
  );
}
