import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/navbar";
import Footer from "@/components/footer";
import LocalizedText from "@/components/localized_text";
import TechnologiesSection from "@/components/sub_services_pages/technalogies";
import { featuredWork, getWorkProject, workCategories } from "@/data/featured-work";
import { getCachedLanguage } from "@/lib/language";
import { localizeContentTree } from "@/lib/content-language";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return featuredWork.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) return {};
  const lang = await getCachedLanguage();
  const copy = await localizeContentTree({
    title: `${project.name} Project Case Study | Devisgon`,
    description: project.description,
  }, lang);
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: `/our-work/${project.slug}` },
    openGraph: { title: copy.title, description: copy.description, url: `/our-work/${project.slug}` },
  };
}

export default async function WorkProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getWorkProject(slug);
  if (!project) notFound();
  const lang = await getCachedLanguage();
  const copy = await localizeContentTree({
    back: "All work",
    live: "Visit live project",
    liveSoon: "Live project link to be added",
    gallery: "Project gallery",
    galleryHint: "Approved screenshots and design exports can be added to the media paths shown below.",
    scope: "How the platform was built",
    scopeKicker: "From product idea to connected system",
    scopeIntro: "MeMyselfI.ai brings several substantial product areas together. The story below follows the work from the user-facing experience through the AI, communications, mobile, cloud and release layers.",
    toolsTitle: "The tools behind the platform",
    toolsSubtitle: "A connected stack for product experience, AI services, communications, data, deployment and mobile.",
    more: "Building a product with this level of complexity?",
    projectLink: "Live project link",
    logo: "Project logo",
    imagePending: "Image slot ready",
    logoHint: "Upload the approved logo and set its public path in the project data.",
    nextStep: "Start a conversation",
  }, lang);
  const story = lang === "en" ? {
    title: project.title,
    description: project.description,
    detail: project.detail,
    sections: project.sections,
  } : await localizeContentTree({
    title: project.title,
    description: project.description,
    detail: project.detail,
    sections: project.sections,
  }, lang);

  return (
    <>
      <Header />
      <LocalizedText lang={lang}>
        <main id="main-content" className="mx-auto max-w-6xl px-6 pb-24 pt-36 text-t-primary">
          <Link href="/our-work" className="text-sm font-medium underline underline-offset-4">← {copy.back}</Link>

          <header className="mt-10 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="max-w-4xl">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest">
                {project.logoIconSrc && (
                  <span className="inline-flex items-center rounded bg-white p-1 dark:bg-[#101010]">
                    <Image src={project.logoIconSrc} alt="" width={24} height={20} className="h-5 w-auto object-contain dark:hidden" />
                    <Image src={project.logoIconDarkSrc} alt="" width={24} height={20} className="hidden h-5 w-auto object-contain dark:block" />
                  </span>
                )}
                Project {project.number}
              </p>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
                {project.logoSrc ? (
                  <>
                    <Image src={project.logoSrc} alt={`${project.name} logo`} width={214} height={36} priority className="h-9 w-auto max-w-[300px] object-contain object-left dark:hidden" />
                    <Image src={project.logoDarkSrc} alt={`${project.name} logo`} width={214} height={36} priority className="hidden h-9 w-auto max-w-[300px] object-contain object-left dark:block" />
                  </>
                ) : project.name}
              </h1>

              <p className="mt-5 text-xl leading-8">{story.title}</p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-t-secondary">{story.detail}</p>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.categoryIds.map((id) => (
                  <span key={id} className="rounded-full border border-[#D1AFEC] px-3 py-1.5 text-xs">
                    {workCategories.find((category) => category.id === id)?.label ?? id}
                  </span>
                ))}
              </div>

              {project.liveUrl ? (
                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-xl bg-[#40005B] px-5 py-3 text-sm font-semibold text-white">
                  {copy.live} ↗
                </a>
              ) : (
                <p className="mt-8 inline-flex rounded-xl border border-dashed border-[#D1AFEC] px-5 py-3 text-sm">{copy.liveSoon}</p>
              )}
              {!project.logoSrc && (
                <p className="mt-8 text-xs text-t-secondary">
                  {copy.logoHint} <code>{project.logoUploadPath}</code>
                </p>
              )}
            </div>

            {project.heroImageSrc && (
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-[#D1AFEC]/30 bg-[#15121a] shadow-2xl">
                <Image src={project.heroImageSrc} alt={`${project.name} product experience preview`} fill priority sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
              </div>
            )}
          </header>

          {project.technologyTools.length > 0 && (
            <div className="relative left-1/2 mt-10 w-screen -translate-x-1/2 overflow-hidden">
              <TechnologiesSection data={{ title: copy.toolsTitle, subtitle: copy.toolsSubtitle, tools: project.technologyTools }} />
            </div>
          )}

          <section className="mt-20" aria-labelledby="project-story-heading">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A71A7F]">{copy.scopeKicker}</p>
              <h2 id="project-story-heading" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{copy.scope}</h2>
              <p className="mt-4 text-base leading-8 text-t-secondary">{copy.scopeIntro}</p>
            </div>

            <div className="mt-12">
              {story.sections.map((section, index) => (
                <article key={section.id} id={section.id} className="scroll-mt-28 border-t border-[#D1AFEC]/70 py-9 md:py-12">
                  <div className="flex items-start gap-5">
                    <span className="mt-1 shrink-0 font-mono text-sm font-semibold text-[#A71A7F]">{String(index + 1).padStart(2, "0")}</span>
                    <div className="max-w-4xl">
                      <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{section.title}</h3>
                      <p className="mt-4 text-base leading-8 text-t-secondary">{section.summary}</p>
                      <ul className="mt-5 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-3 text-sm leading-7 text-t-primary">
                            <span aria-hidden="true" className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#A71A7F]" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {project.images.length > 0 && (
            <section className="mt-16" aria-labelledby="project-gallery-heading">
              <h2 id="project-gallery-heading" className="text-3xl font-semibold">{copy.gallery}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-t-secondary">{copy.galleryHint}</p>
              <div className="mt-8 space-y-8">
                {project.images.map((image) => (
                  <figure key={image.title} className="overflow-hidden rounded-2xl border border-dashed border-[#D1AFEC]">
                    {image.src ? (
                      <Image src={image.src} alt={image.alt} width={1600} height={1000} className="w-full object-cover" />
                    ) : (
                      <div className="flex min-h-72 items-center justify-center bg-[#F7F0FC] p-6 text-center dark:bg-[#281731]">
                        <div>
                          <p className="font-semibold">{image.title}</p>
                          <p className="mt-2 text-sm text-t-secondary">{copy.imagePending}</p>
                          <code className="mt-3 block break-all text-xs">{image.uploadPath}</code>
                        </div>
                      </div>
                    )}
                    <figcaption className="border-t border-[#D1AFEC]/50 p-4 text-sm font-medium">{image.title}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          )}

          <section className="mt-16 rounded-2xl bg-[#F7F0FC] p-8 dark:bg-[#281731] md:p-12">
            <h2 className="text-3xl font-semibold">{copy.more}</h2>
            <Link href="/contact" className="mt-6 inline-flex rounded-xl bg-[#40005B] px-6 py-4 text-sm font-semibold text-white dark:bg-[#A71A7F]">
              {copy.nextStep}
            </Link>
          </section>
        </main>
      </LocalizedText>
      <Footer />
    </>
  );
}
