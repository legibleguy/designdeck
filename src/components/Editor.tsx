import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function Editor() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <h1>Game Design Document</h1>
      <p>Start writing your game design document here...</p>
    `,
  });

  if (!editor) {
    return null; // Avoid rendering if the editor is not initialized
  }

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <EditorContent
        editor={editor}
        className="prose prose-lg text-gray-800"
      />
    </div>
  );
}
