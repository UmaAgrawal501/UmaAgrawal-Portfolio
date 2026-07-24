type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

/** Server-only JSON-LD script — no client JavaScript. */
export function JsonLd({ data }: JsonLdProps) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <>
      {payload.map((entry, index) => (
        <script
          // Stable enough for static structured data blocks on a page.
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
