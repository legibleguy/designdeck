'use client';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import { MechanicsLibrary } from '@/components/MechanicsLibrary';
import { Editor } from '@/components/Editor';
import { ProjectTags } from '@/components/ProjectTags';
import { EstimatedProductionTime } from '@/components/EstimatedProductionTime';
import mechanicsData from '@/data/mechanicsData'; // Import mechanics data

interface ProjectTag {
  id: string;
  title: string;
  description: string;
  relation?: string;
}

export default function Home() {
  const [projectTags, setProjectTags] = useState<ProjectTag[]>([]);
  const [droppedMechanics, setDroppedMechanics] = useState<string[]>([]);
  const [gameDesignText, setGameDesignText] = useState<string>(''); // Track the game design document text

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

  const handleRemoveTag = (tagId: string, tagTitle: string) => {
    setProjectTags((prevTags) => prevTags.filter((tag) => tag.id !== tagId)); // Remove tag
    setDroppedMechanics((prev) => prev.filter((title) => title !== tagTitle)); // Make it visible in Mechanics Library
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
      <main
        className="flex min-h-screen p-6 rounded-xl border border-gray-200"
        style={{
          background: 'linear-gradient(to bottom right, #F8FBFE, #E8F0FF)', // Apple-like gradient
        }}
      >
        {/* Left Sidebar - Mechanics Library */}
        <div className="w-90 p-6 rounded-xl border border-gray-200" style={{
          background: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white
          backdropFilter: 'blur(10px)', // Smoothens it
          border: '1px solid rgba(255, 255, 255, 0.3)', // Transparent border
        }}>
          <h2 className="text-4xl font-semibold mb-4 text-gray-900" style={{
            padding: '10px',
            paddingLeft: '25px',
            paddingBottom: '0',
          }}>Idea Blocks</h2>
          <div className="h-[calc(100vh-4rem)] overflow-y-auto">
            <MechanicsLibrary
              onDrop={(mechanicTitle) => console.log(`Dropped mechanic: ${mechanicTitle}`)}
              hiddenMechanics={droppedMechanics} // Pass dropped mechanics to hide
            />
          </div>
        </div>

        {/* Main Content - Document Editor */}
        <div className="flex-1 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">Design Deck</h1>
            <Editor value={gameDesignText} onChange={setGameDesignText} /> {/* Pass value and onChange */}
          </div>
        </div>

        {/* Right Sidebar - Project Tags */}
        <div className="w-72 p-4">
          <EstimatedProductionTime
            tags={projectTags.map((tag) => tag.title)}
            mechanicsData={mechanicsData} // Pass mechanics data
            gameDesignText={gameDesignText} // Pass game design document text
          />
          <h2 className="text-2xl font-semibold text-gray-900" style={{
            padding: '16px',
            paddingBottom: '0',
          }}>Project Tags</h2>
          <div className="h-[calc(100vh-22rem)] overflow-y-auto"> {/* Added fixed height and scroll */}
            <ProjectTags
              tags={projectTags}
              onDrop={handleDrop}
              onRemove={handleRemoveTag}
              onUpdateRelation={handleUpdateRelation}
              gameDesignText={gameDesignText} // Pass the game design document text
              setGameDesignText={setGameDesignText} // Pass setter to update the editor content
            />
          </div>
        </div>
      </main>
    </DndProvider>
  );
}
