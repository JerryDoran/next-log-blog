'use client';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type RichTextViewerProps = {
  content: string | Record<string, unknown>;
};

export default function RichTextViewer({ content }: RichTextViewerProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: typeof content === 'string' ? content : JSON.stringify(content),
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return <EditorContent editor={editor} />;
}
