interface TagProps {
  children: string;
}

// Outlined mono chip for tech stack labels (Experience, Projects)
export default function Tag({ children }: TagProps) {
  return (
    <span className="rounded-md border border-accent px-2 py-0.5 font-mono text-xs text-accent">
      {children}
    </span>
  );
}