import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy, getNextCaseStudy } from "@/data/case-studies";
import { getProject } from "@/data/projects";
import { imageExists } from "@/lib/image-exists";
import CaseStudy from "@/components/CaseStudy";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) return {};
  return {
    title: `${caseStudy.title} — Eron Begiqi`,
    description: caseStudy.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  const nextCaseStudy = getNextCaseStudy(slug);
  const nextProjectMeta = nextCaseStudy ? getProject(nextCaseStudy.slug) : undefined;

  const nextProject =
    nextCaseStudy && nextProjectMeta
      ? {
          slug: nextCaseStudy.slug,
          title: nextCaseStudy.title,
          category: nextCaseStudy.category,
          year: nextCaseStudy.year,
          thumbnail: nextProjectMeta.thumbnail,
          thumbnailAlt: nextProjectMeta.thumbnailAlt,
          thumbnailExists: imageExists(nextProjectMeta.thumbnail),
        }
      : null;

  return (
    <CaseStudy
      caseStudy={caseStudy}
      totalCount={caseStudies.length}
      coverExists={imageExists(caseStudy.cover)}
      overviewImageExists={imageExists(caseStudy.overviewImage)}
      gallery={caseStudy.gallery.map((item) => ({
        ...item,
        exists: imageExists(item.src),
      }))}
      nextProject={nextProject}
    />
  );
}
