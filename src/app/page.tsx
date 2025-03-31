'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { MechanicsLibrary } from '@/components/MechanicsLibrary';
import { Editor } from '@/components/Editor';
import { ProjectTags } from '@/components/ProjectTags';
import { EstimatedProductionTime } from '@/components/EstimatedProductionTime';

interface ProjectTag {
  id: string;
  title: string;
  description: string;
  relation?: string;
}

export default function Home() {
  const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);
  const [droppedMechanics, setDroppedMechanics] = useState<string[]>([]);

  const handleDrop = (mechanic: { title: string; description: string }) => {
    const newTag: ProjectTag = {
      id: crypto.randomUUID(), // Generate a unique ID for the tag
      title: mechanic.title,
      description: mechanic.description,
      relation: '', // Initialize relation as an empty string
    };
    setProjectTags((prevTags) => [...prevTags, newTag]);
    setDroppedMechanics((prev) => [...prev, mechanic.title]); // Track dropped mechanics
  };

  const handleRemoveTag = (tagId: string) => {
    const tagToRemove = projectTags.find((tag) => tag.id === tagId);
    if (tagToRemove) {
      setProjectTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId)); // Remove tag
      setDroppedMechanics((prev) => prev.filter((title) => title !== tagToRemove.title)); // Make it visible in Mechanics Library
    }
  };

  const handleUpdateRelation = (tagId: string, newRelation: string) => {
    setProjectTags((prevTags) =>
      prevTags.map((tag) =>
        tag.id === tagId ? { ...tag, relation: newRelation } : tag
      )
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <main className="flex min-h-screen bg-gray-50">
        {/* Left Sidebar - Building Blocks */}
        <div className="w-72 bg-white p-6 border-r border-gray-200">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Building Blocks</h2> {/* Updated size and weight */}
          <div className="h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide"> {/* Added scrollbar-hide */}
            <MechanicsLibrary
              onDrop={(mechanicTitle) => console.log(`Dropped mechanic: ${mechanicTitle}`)}
              hiddenMechanics={droppedMechanics} // Pass dropped mechanics to hide
            />
          </div>
        </div>

        {/* Main Content - Document Editor */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <Editor />
          </div>
        </div>

        {/* Right Sidebar - Project Tags */}
        <div className="w-72 bg-white p-6 border-l border-gray-200">
          <EstimatedProductionTime tags={projectTags.map((tag) => tag.title)} />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Project Tags</h2>
          <div className="h-[calc(100vh-24rem)] overflow-y-auto"> {/* Added fixed height and scroll */}
            <ProjectTags
              tags={projectTags}
              onDrop={handleDrop}
              onRemove={handleRemoveTag}
              onUpdateRelation={handleUpdateRelation}
            />
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
