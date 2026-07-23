export function FAQList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={item.q} className="group py-5" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-fg [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              className="shrink-0 font-mono text-xl text-accent transition-transform duration-[var(--d-fast)] group-open:rotate-45"
              aria-hidden="true"
            >
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[var(--measure)] font-body text-sm leading-[var(--lh-body)] text-muted">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
