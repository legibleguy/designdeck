import React, { useMemo } from 'react';
import { useDrag } from 'react-dnd';

interface MechanicCardProps {
  title: string;
  description: string;
  category?: string;
  longDescription?: string;
  examples?: string[];
  solvedProblems?: string[];
  minTimeToImplement?: string;
  maxTimeToImplement?: string;
  timeToImplementExplained?: string;
}

export function MechanicCard({ title, description, category }: MechanicCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MECHANIC',
    item: { title, description },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragRef = React.useRef<HTMLDivElement>(null);
  drag(dragRef);

  // Map categories to specific gradients
  const categoryGradients: Record<string, string> = {
    AI: 'linear-gradient(135deg, #A1C4FD, #C2E9FB)',
    Abilities: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)',
    Actions: 'linear-gradient(135deg, #FF9A8B, #FF6A88)',
    Audio: 'linear-gradient(135deg, #C2FFD8, #465EFB)',
    Building: 'linear-gradient(135deg, #FFC3A0, #FFAFBD)',
    Camera: 'linear-gradient(135deg, #84FAB0, #8FD3F4)',
    Combat: 'linear-gradient(135deg, #A6C1EE, #FBC2EB)',
    Crafting: 'linear-gradient(135deg, #FFDEE9, #B5FFFC)',
    Economy: 'linear-gradient(135deg, #D4FC79, #96E6A1)',
    Exploration: 'linear-gradient(135deg, #FF9A8B, #FFC3A0)',
    Input: 'linear-gradient(135deg, #8FD3F4, #A1C4FD)',
    Modding: 'linear-gradient(135deg, #FAD0C4, #FFD1FF)',
    Movement: 'linear-gradient(135deg, #C2FFD8, #465EFB)',
    Multiplayer: 'linear-gradient(135deg, #FFC3A0, #FFAFBD)',
    Narrative: 'linear-gradient(135deg, #A6C1EE, #FBC2EB)',
    Physics: 'linear-gradient(135deg, #FFDEE9, #B5FFFC)',
  };

  // Get the gradient for the category or use a default gradient
  const gradient = useMemo(() => categoryGradients[category || ''] || 'linear-gradient(135deg, #A1C4FD, #C2E9FB)', [category]);

  return (
    <div
      ref={dragRef}
      className={`relative p-6 rounded-2xl cursor-pointer transition-transform transform hover:scale-[1.05] ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        background: gradient,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        minHeight: '100px',
        maxWidth: '350px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h3 className="text-2xl font-bold text-white tracking-wide">{title}</h3>
    </div>
  );
}