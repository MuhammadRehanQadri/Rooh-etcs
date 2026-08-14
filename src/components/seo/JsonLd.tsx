/**
 * Renders a schema.org JSON-LD document.
 *
 * Server component — the payload is serialised at render time and ships in the
 * HTML, so crawlers that don't execute JS still see it.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for the one sequence that can break
      // out of a <script> element.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
