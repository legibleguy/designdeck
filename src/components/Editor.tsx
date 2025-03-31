import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({
        levels: [1, 2, 3], // Support for H1, H2, H3 headings
      }),
    ],
    content: `
      <h1>Design Deck</h1>
      <p>Start writing your game design document here...</p>
    `,
  });

  if (!editor) {
    return null; // Avoid rendering if the editor is not initialized
  }

  return (
    <div className="p-4 bg-white border rounded shadow">
      <EditorContent
        editor={editor}
        className="prose prose-lg text-gray-800" // Apply Tailwind's prose class for heading styles
      />
    </div>
  );
}
