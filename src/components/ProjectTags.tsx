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
  onRemove: (tagId: string, tagTitle: string) => void; // Add onRemove prop
}

export function ProjectTags({ tags, onDrop, onRemove }: ProjectTagsProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'MECHANIC',
    drop: (item: { title: string; description: string }) => {
      onDrop(item); // Call the onDrop function passed from the parent
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
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{tag.title}</h3>
                  <p className="text-sm text-gray-600">{tag.description}</p>
                  {tag.relation && <p className="text-xs text-gray-500">Relation: {tag.relation}</p>}
                </div>
                <button
                  onClick={() => onRemove(tag.id, tag.title)} // Call onRemove when clicked
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
