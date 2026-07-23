export function SectionHeading({ kicker, title }: { kicker?: string; title: string }) {
  return (
    <div className="mx-auto max-w-[var(--measure)] text-center">
      {kicker && (
        <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">{kicker}</p>
      )}
      <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-fg md:text-4xl">
        {title}
      </h2>
    </div>
  );
}
