type LegalSection = { heading: string; body: string };

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  if (!Array.isArray(sections) || sections.length === 0) return null;

  return (
    <div className="mt-10 space-y-8">
      {sections.map((section) => (
        <section key={section.heading}>
          <h2 className="font-serif text-xl text-foreground">{section.heading}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </div>
  );
}
