"use client";

import dynamic from "next/dynamic";

// Dynamically import client component with no SSR
const ProjectDetailClient = dynamic(() => import("./ProjectDetailClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

export default function ProjectDetailClientWrapper({ params }: { params: { id: string } }) {
  console.log('ProjectDetailClientWrapper received params:', params);
  return <ProjectDetailClient params={params} />;
}
