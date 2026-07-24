import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import content from '@/content/content.json';
import { Reveal } from '@/components/Reveal';
import { RevealGroup, RevealItem } from '@/components/RevealGroup';
import { ParticleText } from '@/components/ParticleText';

export const dynamicParams = false;

export function generateStaticParams() {
  return content.services.map((service) => ({ slug: service.id }));
}

function getService(slug: string) {
  return content.services.find((service) => service.id === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.headline,
    alternates: { canonical: `/servicios/${service.id}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const includes = 'includes' in service ? (service.includes as string[]) : undefined;
  const ctaLabel = service.price ? `Comprar por ${service.price}` : 'Contactar';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.headline,
    provider: { '@type': 'Organization', name: content.legal.company },
    ...(service.price && {
      offers: { '@type': 'Offer', price: service.price.replace('$', ''), priceCurrency: 'USD' },
    }),
  };

  return (
    <main id="main" className="px-[var(--gutter)] pb-[var(--section-y)] pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="mx-auto max-w-3xl">
        <Reveal immediate>
          <p className="font-mono text-mono uppercase tracking-[var(--tr-mono)] text-accent">
            {service.kicker}
          </p>
          <ParticleText as="h1" className="mt-3 font-display text-3xl font-light tracking-tight text-fg">
            {service.title}
          </ParticleText>
          <p className="mt-4 font-body text-lg text-muted">{service.headline}</p>

          <div className="mt-10 space-y-4 font-body text-base leading-[var(--lh-body)] text-muted">
            {service.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        {includes && (
          <RevealGroup immediate>
            <ul className="mt-8 space-y-3">
              {includes.map((item) => (
                <RevealItem
                  key={item}
                  className="flex items-start gap-3 font-body text-sm text-muted"
                >
                  <span className="mt-0.5 text-accent" aria-hidden="true">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        )}

        <RevealGroup immediate>
          <ol className="mt-12 space-y-8 border-t border-line pt-8">
            {service.steps.map((step) => (
              <RevealItem key={step.title}>
                <ParticleText as="h2" className="font-display text-lg font-medium text-fg">
                  {step.title}
                </ParticleText>
                {'text' in step && step.text && (
                  <p className="mt-2 font-body text-sm text-muted">{step.text}</p>
                )}
                {'list' in step && step.list && (
                  <ul className="mt-3 space-y-2 pl-5">
                    {step.list.map((item) => (
                      <li key={item} className="list-disc font-body text-sm text-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </RevealItem>
            ))}
          </ol>
        </RevealGroup>

        <Reveal immediate>
          <p className="mt-10 border-t border-line pt-8 font-body text-sm text-muted">
            {service.postDelivery}
          </p>

          <div className="mt-10 text-center">
            <a
              href={service.purchaseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              {ctaLabel}
            </a>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
