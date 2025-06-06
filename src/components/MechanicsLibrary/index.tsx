'use client';

import { MechanicCard } from './MechanicsCard';
import { useEffect, useState } from 'react';
import type { GameMechanic } from '@prisma/client';

interface MechanicsLibraryProps {
  onDrop: (mechanicTitle: string) => void;
  hiddenMechanics: string[]; // List of mechanics to hide
}

export function MechanicsLibrary({ hiddenMechanics }: MechanicsLibraryProps) {
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

  // Filter out hidden mechanics
  const visibleMechanics = mechanics.filter(
    (mechanic) => !hiddenMechanics.includes(mechanic.title)
  );

  return (
    <div
      className="grid grid-cols-1 gap-6 overflow-y-auto scrollbar-hide"
      style={{
        padding: '40px',
        margin: '-16px',
      }}
    >
      {visibleMechanics.map((mechanic) => (
        <MechanicCard
          key={mechanic.id}
          title={mechanic.title}
          description={mechanic.description}
          category={mechanic.category} // Pass the category to the card
        />
      ))}
    </div>
  );
}