'use client';

import { useDroppable } from '@dnd-kit/core';
import { useState, useEffect } from 'react';

interface ProjectTag {
  id: string;
  title: string;
  description: string;
  relation?: string;
}

interface ProjectTagsProps {
  tags: ProjectTag[];
  onUpdateRelation: (id: string, relation: string) => void;
  onRemoveTag: (id: string) => void;
}

export function ProjectTags({ tags, onUpdateRelation, onRemoveTag }: ProjectTagsProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { setNodeRef, isOver } = useDroppable({
    id: 'project-tags',
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initial render without drag and drop functionality
  if (!isMounted) {
    return (
      <div className="h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg w-full">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={setNodeRef}
      className="h-[calc(100vh-8rem)] flex flex-col relative"
    >
      <div className={`absolute inset-0 transition-colors ${isOver ? 'bg-blue-50' : ''}`} />
      <div className="relative flex-1 z-10">
        {tags.length > 0 ? (
          <div className="space-y-4 p-4 overflow-y-auto h-full">
            {tags.map((tag) => (
              <div key={tag.id} className="group bg-white p-4 rounded-lg border border-gray-200 relative">
                <button
                  onClick={() => onRemoveTag(tag.id)}
                  className="absolute top-2 right-2 p-1 rounded-md text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all"
                  aria-label="Remove tag"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <h3 className="font-medium text-gray-900 mb-1">{tag.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{tag.description}</p>
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Relation to Project
                  </label>
                  <textarea
                    className="w-full px-3 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="Describe how this mechanic fits into your game..."
                    value={tag.relation || ''}
                    onChange={(e) => onUpdateRelation(tag.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg w-full">
              Drag mechanics here to add them to your project
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 