import React, { useState } from 'react';
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
  onUpdateRelation: (tagId: string, newRelation: string) => void;
  gameDesignText: string;
  setGameDesignText: (text: string) => void; // Setter for the Document Editor content
}

export function ProjectTags({
  tags,
  onDrop,
  onRemove,
  onUpdateRelation,
  gameDesignText,
  setGameDesignText,
}: ProjectTagsProps) {
  const [expandedTagId, setExpandedTagId] = useState<string | null>(null); // Track which tag's text box is visible
  const [loadingTagId, setLoadingTagId] = useState<string | null>(null);

  const handleToggleRelation = (tagId: string) => {
    setExpandedTagId((prev) => (prev === tagId ? null : tagId)); // Toggle visibility
  };

  const handleGenerate = async (tag: ProjectTag) => {
    setLoadingTagId(tag.id);

    try {
      const relationText = tag.relation
        ? ` Here is how this tag relates to the project: "${tag.relation}".`
        : '';

      const requestBody = {
        model: 'google/gemini-2.5-pro-exp-03-25:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: gameDesignText
                  ? `Based on the following game design document, append a new idea that integrates the tag "${tag.title}" (${tag.description}).${relationText} Maintain the original tone, format, and style of the text, and avoid rewriting or restructuring the existing content. Here is the current document:\n\n${gameDesignText}`
                  : `Generate a new game idea based on the tag "${tag.title}" (${tag.description}).${relationText} Write in a casual, amateur tone and format, as if brainstorming ideas informally.`,
              },
            ],
          },
        ],
      };

      console.log('Request body being sent to LLM:', JSON.stringify(requestBody, null, 2)); // Log full request body

      const res = await fetch('/api/openrouter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('LLM API Error:', error);
        throw new Error(`LLM API returned an error: ${error.error || 'Unknown error'}`);
      }

      const data = await res.json();
      console.log('LLM Response:', JSON.stringify(data, null, 2)); // Log full response body

      const generatedContent = data.choices[0]?.message?.content || '';
      console.log('Generated Content to Update Editor:', generatedContent); // Log the content to be set

      if (!generatedContent) {
        console.warn('No content received from LLM.');
      }

      // Append the new content to the existing document
      setGameDesignText(`${generatedContent}`);
    } catch (error) {
      console.error('Error generating text:', error);
    } finally {
      setLoadingTagId(null);
    }
  };

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
      className={`p-4 rounded-lg ${
        isOver ? 'bg-blue-100' : tags.length === 0 ? 'bg-white' : 'bg-none'
      }`}
    >
      {tags.length === 0 ? (
        <p className="text-gray-500">Drag mechanics here to tag your project.</p>
      ) : (
        <ul className="space-y-2">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="bg-white p-2 rounded-lg shadow-sm hover:bg-gray-200"
            >
              <div className="flex justify-between items-center">
                <span
                  className="text-gray-900 cursor-pointer"
                  onClick={() => handleToggleRelation(tag.id)} // Toggle visibility on click
                >
                  {tag.title}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleGenerate(tag)}
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    disabled={loadingTagId === tag.id}
                  >
                    {loadingTagId === tag.id ? 'Loading...' : '✨'} {/* Magic wand icon or text */}
                  </button>
                  <button
                    onClick={() => onRemove(tag.id, tag.title)}
                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </div>
              {expandedTagId === tag.id && ( // Show text box if this tag is expanded
                <textarea
                  value={tag.relation || ''}
                  onChange={(e) => onUpdateRelation(tag.id, e.target.value)}
                  placeholder="Explain how this works in your game..."
                  className="mt-2 w-full p-2 border rounded text-sm text-gray-700"
                  rows={2}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
