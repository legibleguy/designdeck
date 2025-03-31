import React from 'react';
import { useDrag } from 'react-dnd';

interface MechanicCardProps {
  title: string;
}

const gradients = [
  'linear-gradient(135deg, #a855f7, #3b82f6)',
  'linear-gradient(135deg, #f97316, #f43f5e)',
  'linear-gradient(135deg, #10b981, #3b82f6)',
  'linear-gradient(135deg, #facc15, #f97316)',
  'linear-gradient(135deg, #3b82f6, #9333ea)',
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
      className={`p-4 rounded-lg shadow-md cursor-move transition-transform ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        background: randomGradient,
        color: 'white',
        fontSize: '16px',
        fontWeight: '500',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}