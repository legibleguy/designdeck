import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Heading from '@tiptap/extension-heading';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean; // Add a disabled prop
}

export function Editor({ value, onChange, disabled = false }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold, // Enable bold text formatting
      Heading.configure({
        levels: [1, 2, 3], // Support for #title, ##subtitle, ###subsubtitle
      }),
    ],
    content: value, // Set the initial content to the passed value
    editable: !disabled, // Disable editing when the editor is disabled
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
    <div
      className={`p-6 bg-white rounded-lg shadow-md ${
        disabled ? 'opacity-50 pointer-events-none loading' : ''
      }`}
      style={{
        height: '100%', // Ensure the editor container takes full height
        maxHeight: 'calc(100vh - 200px)', // Limit the height to fit within the page
        overflow: 'hidden', // Prevent content from overflowing the container
      }}
    >
      <div
        style={{
          height: '100%',
          overflowY: 'auto', // Enable vertical scrolling for the text content
        }}
      >
        <EditorContent
          editor={editor}
          className="prose prose-lg text-gray-800 custom-editor"
        />
      </div>
    </div>
  );
}
