'use client';

import { MechanicsLibrary } from '@/components/MechanicsLibrary';
import { ProjectTags } from '@/components/ProjectTags';
import { Editor } from '@/components/Editor';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

interface ProjectTag {
  id: string;
  title: string;
  description: string;
  relation?: string;
}

export default function Home() {
  const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);

  // Configure sensors with activation constraints
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100, // 100ms delay for touch devices
        tolerance: 8, // 8px of movement allowed during delay
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Only handle drops in the project-tags area
    if (over && over.id === 'project-tags') {
      const { title, description } = active.data.current as { title: string; description: string };
      
      // Check if the tag already exists
      if (!projectTags.some(tag => tag.id === active.id)) {
        setProjectTags([
          ...projectTags,
          {
            id: active.id as string,
            title,
            description,
          }
        ]);
      }
    }
  };

  const handleUpdateRelation = (id: string, relation: string) => {
    setProjectTags(projectTags.map(tag => 
      tag.id === id ? { ...tag, relation } : tag
    ));
  };

  const handleRemoveTag = (id: string) => {
    setProjectTags(projectTags.filter(tag => tag.id !== id));
  };

  return (
    <DndContext 
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <main className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar - Mechanics Library */}
        <div className="w-72 bg-white p-4 border-r border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Mechanics Library</h2>
          <MechanicsLibrary />
        </div>

        {/* Main Content - Document Editor */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Design Deck</h1>
            <Editor />
          </div>
        </div>

        {/* Right Sidebar - Project Tags */}
        <div className="w-72 bg-white p-4 border-l border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-900">Project Tags</h2>
          <ProjectTags 
            tags={projectTags} 
            onUpdateRelation={handleUpdateRelation}
            onRemoveTag={handleRemoveTag}
          />
        </div>
      </main>
    </DndContext>
  );
}
