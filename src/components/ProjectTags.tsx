import React from 'react';
import { useDrop } from 'react-dnd';

interface ProjectTag {
  id: string;
  title: string;
}

interface ProjectTagsProps {
  tags: ProjectTag[];
  onDrop: (mechanic: { title: string; description: string }) => void;
  onRemove: (tagId: string) => void;
  onUpdateRelation: (tagId: string, newRelation: string) => void; 
}

export function ProjectTags({ tags, onDrop, onRemove }: ProjectTagsProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'MECHANIC',
    drop: (item: { title: string }) => {
      onDrop({ title: item.title, description: 'Default description' });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const dropRef = React.useRef<HTMLDivElement>(null);
  drop(dropRef);

  return (
    <div
      ref={dropRef}
      className={`p-4 rounded-lg border ${
        isOver ? 'bg-blue-100' : 'bg-gray-50'
      }`}
    >
      {tags.length === 0 ? (
        <p className="text-gray-500">Drag mechanics here to tag your project.</p>
      ) : (
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200"
            >
              <span className="text-gray-900">{tag.title}</span>
              <button
                onClick={() => onRemove(tag.id)}
                className="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
