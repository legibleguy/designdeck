'use client';

import { MechanicCard } from './MechanicsCard';

// This is temporary mock data - we'll replace it with real data from your CSV
const mockMechanics = [
  {
    id: 'weather-systems',
    title: "Weather Systems",
    description: "Dynamic weather effects that impact gameplay.",
  },
  {
    id: 'wall-run',
    title: "Wall Run",
    description: "Allows players to run along walls for dynamic traversal.",
  },
  {
    id: 'voice-input',
    title: "Voice Input",
    description: "Control gameplay using voice commands.",
  },
];

export function MechanicsLibrary() {
  return (
    <div className="space-y-4">
      {mockMechanics.map((mechanic) => (
        <MechanicCard
          key={mechanic.id}
          id={mechanic.id}
          title={mechanic.title}
          description={mechanic.description}
        />
      ))}
    </div>
  );
} 