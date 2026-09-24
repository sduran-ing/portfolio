interface SectionLabelProps {
  children: string;
}

// Small mono label above every section ("About", "Experience", "Featured
// project", "Contact"). Content stays plain sentence case in the data files;
// uppercase is applied here via CSS text-transform, screen readers announce the actual text ("About")
export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="mb-3 font-mono text-md uppercase tracking-widest text-accent">
      {children}
    </p>
  );
}