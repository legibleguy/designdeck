import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value, // Set the initial content to the passed value
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML()); // Update the parent state on content change
    },
  });

  // Update the editor content when the `value` prop changes
  useEffect(() => {
    if (editor && editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null; // Avoid rendering if the editor is not initialized
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <EditorContent
        editor={editor}
        className="prose prose-lg text-gray-800"
      />
    </div>
  );
}
