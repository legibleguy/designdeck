'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect } from 'react';

interface MechanicCardProps {
  id: string;
  title: string;
  description: string;
}

export function MechanicCard({ id, title, description }: MechanicCardProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    data: {
      title,
      description,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  }

  const style = transform ? {
    transform: CSS.Transform.toString(transform),
    touchAction: 'none',
  } : {
    touchAction: 'none',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow ${
        isDragging ? 'opacity-50 shadow-lg ring-2 ring-blue-400 z-50' : ''
      }`}
    >
      <h3 className="font-medium text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
} 