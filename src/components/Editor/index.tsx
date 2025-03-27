'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export function Editor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-slate max-w-none focus:outline-none',
      },
    },
    content: `
      <h1>Game Design Document</h1>
      <p>Start writing your game design document here...</p>
    `,
  });

  return (
    <div className="min-h-[500px] w-full bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <EditorContent editor={editor} />
    </div>
  );
} 