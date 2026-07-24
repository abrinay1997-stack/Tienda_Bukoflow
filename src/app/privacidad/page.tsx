import type { Metadata } from 'next';
import policy from '@/content/privacy-policy.json';
import { Reveal } from '@/components/Reveal';

export const metadata: Metadata = {
  title: policy.title,
  description: `Política de privacidad de BUKOFLOW: qué datos recopilamos, cómo los usamos y tus derechos. Vigente desde el ${policy.effectiveDate}.`,
  alternates: { canonical: '/privacidad' },
};

export default function PrivacidadPage() {
  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <article className="mx-auto max-w-3xl">
        <Reveal immediate>
          <h1 className="text-center font-display text-3xl font-light tracking-tight text-fg">
            {policy.title}
          </h1>
          <p className="mt-3 text-center font-mono text-mono uppercase tracking-[var(--tr-mono)] text-muted">
            Vigente desde el {policy.effectiveDate}
          </p>
        </Reveal>

        <div className="mt-10 space-y-4 font-body text-base leading-[var(--lh-body)] text-muted">
          {policy.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12 space-y-12 border-t border-line pt-12">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl font-medium text-fg">{section.heading}</h2>

              {'paragraphs' in section && section.paragraphs && (
                <div className="mt-4 space-y-3 font-body text-sm leading-[var(--lh-body)] text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              {'list' in section && section.list && (
                <ul className="mt-3 space-y-2 pl-5">
                  {section.list.map((item) => (
                    <li key={item} className="list-disc font-body text-sm text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {'paragraphsAfter' in section && section.paragraphsAfter && (
                <div className="mt-3 space-y-3 font-body text-sm leading-[var(--lh-body)] text-muted">
                  {section.paragraphsAfter.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              )}

              {'items' in section && section.items && (
                <dl className="mt-4 space-y-4">
                  {section.items.map((item) => (
                    <div key={item.term}>
                      <dt className="font-body text-sm font-semibold text-fg">{item.term}</dt>
                      <dd className="mt-1 font-body text-sm leading-[var(--lh-body)] text-muted">
                        {item.text}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}

              {'subsections' in section && section.subsections && (
                <div className="mt-6 space-y-6">
                  {section.subsections.map((sub) => (
                    <div key={sub.subheading}>
                      <h3 className="font-display text-base font-medium text-fg">
                        {sub.subheading}
                      </h3>
                      <div className="mt-2 space-y-3 font-body text-sm leading-[var(--lh-body)] text-muted">
                        {sub.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {'list' in sub && sub.list && (
                        <ul className="mt-3 space-y-2 pl-5">
                          {sub.list.map((item) => (
                            <li key={item} className="list-disc font-body text-sm text-muted">
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
