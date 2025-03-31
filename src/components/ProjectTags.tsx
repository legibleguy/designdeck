import React from 'react';
import { useDrop } from 'react-dnd';

interface ProjectTag {
  id: string;
  title: string;
  description: string;
  relation?: string;
}

interface ProjectTagsProps {
  tags: ProjectTag[];
  onDrop: (mechanic: { title: string; description: string }) => void;
  onRemove: (tagId: string, tagTitle: string) => void;
  onUpdateRelation: (tagId: string, newRelation: string) => void; // Add onUpdateRelation prop
}

export function ProjectTags({ tags, onDrop, onRemove, onUpdateRelation }: ProjectTagsProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'MECHANIC',
    drop: (item: { title: string; description: string }) => {
      onDrop(item);
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
            <li key={tag.id} className="text-gray-900">
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{tag.title}</h3>
                  <button
                    onClick={() => onRemove(tag.id, tag.title)}
                    className="text-red-500 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={tag.relation || ''}
                  onChange={(e) => onUpdateRelation(tag.id, e.target.value)} // Update relation on input change
                  placeholder="Relation to your game..."
                  className="p-2 border rounded text-sm text-gray-700"
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
