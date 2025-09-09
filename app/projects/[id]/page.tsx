import ProjectDetailClientWrapper from "./ProjectDetailClientWrapper";

// Generate static params for static export
export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  console.log('ProjectDetailPage resolved params:', resolvedParams);
  return <ProjectDetailClientWrapper params={resolvedParams} />;
}