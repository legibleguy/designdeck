'use client';

import { MechanicCard } from './MechanicsCard';

import { useEffect, useState } from 'react';
import type { GameMechanic } from '@prisma/client';

// This is temporary mock data - we'll replace it with real data from your CSV
const mockMechanics = [
  {
    title: "Weather Systems",
    description: "Dynamic weather effects that impact gameplay.",
  },
  {
    title: "Wall Run",
    description: "Allows players to run along walls for dynamic traversal.",
  },
  {
    title: "Voice Input",
    description: "Control gameplay using voice commands.",
  },
];

export function MechanicsLibrary() {
  const [mechanics, setMechanics] = useState<GameMechanic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMechanics() {
      try {
        const response = await fetch('/api/mechanics');
        const data = await response.json();
        setMechanics(data);
      } catch (error) {
        console.error('Failed to load mechanics:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMechanics();
  }, []);

  if (isLoading) {
    return <div className="p-4 text-gray-500">Loading mechanics...</div>;
  }

  return (
      <div className="space-y-4">
        {mechanics.map((mechanic) => (
          <MechanicCard
            key={mechanic.id}
            title={mechanic.title}
            description={mechanic.description}
          />
        ))}
      </div>
  );
} 