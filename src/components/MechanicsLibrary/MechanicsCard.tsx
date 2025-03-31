import React from 'react';
import { useDrag } from 'react-dnd';

interface MechanicCardProps {
  title: string;
}

const gradients = [
  'linear-gradient(135deg, #ff9a9e, #fad0c4)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
  'linear-gradient(135deg, #84fab0, #8fd3f4)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
];

export function MechanicCard({ title }: MechanicCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'MECHANIC',
    item: { title },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const dragRef = React.useRef<HTMLDivElement>(null);
  drag(dragRef);

  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];

  return (
    <div
      ref={dragRef}
      className={`p-3 rounded-lg shadow-md cursor-move transition-transform ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        background: randomGradient,
        color: 'white',
        width: '90%', // Adjust card width
        margin: '0 auto', // Center the card
      }}
    >
      <h3 className="font-semibold text-xl">{title}</h3> {/* Increased text size */}
    </div>
  );
}