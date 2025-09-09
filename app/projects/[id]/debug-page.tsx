'use client';

import { useEffect, useState } from 'react';
import { useProjectStore } from '@/lib/project-store';

export default function DebugPage({ params }: { params: { id: string } }) {
  const [error, setError] = useState<string | null>(null);
  const { projects } = useProjectStore();

  useEffect(() => {
    console.log('Projects:', projects);
    console.log('Looking for project ID:', params.id);
    
    const currentProject = projects.find(p => p.id === params.id);
    console.log('Found project:', currentProject);
    
    if (!currentProject) {
      setError('Project not found');
    }
  }, [params.id, projects]);

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p className="text-red-500">{error}</p>
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify({ params }, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Info</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Project ID:</h2>
          <pre className="p-2 bg-gray-100 rounded">{params.id}</pre>
        </div>
        <div>
          <h2 className="font-semibold">Projects in Store:</h2>
          <pre className="p-2 bg-gray-100 rounded overflow-auto max-h-60">
            {JSON.stringify(projects, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
