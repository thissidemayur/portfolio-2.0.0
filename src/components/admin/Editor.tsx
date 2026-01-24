"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Link from "@tiptap/extension-link"; // NEW
import Highlight from "@tiptap/extension-highlight"; // NEW
import { Color } from "@tiptap/extension-color"; // NEW
import {TextStyle} from "@tiptap/extension-text-style"; // NEW
import { EditorToolbar } from "./EditorToolbar";

export function RichTextEditor({
  content,
  onChange,
}: {
  content?: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure StarterKit to handle lists properly
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }), // Enables .toggleHighlight()
      Link.configure({
        openOnClick: true, // Set to true to allow clicking in editor
        autolink: true,
        validate: (href) => /^https?:\/\//.test(href),
        HTMLAttributes: {
          class: "text-emerald-500 underline underline-offset-4 cursor-pointer",
          target: "_blank", // Open in new tab
          rel: "noopener noreferrer",
        },
      }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: content || "", // Set initial content if provided
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[500px] w-full max-w-none px-12 py-10",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      {/* 1. The MenuBar */}
      <EditorToolbar editor={editor} />

      {/* 2. The EditorContent */}
      <div className="flex-1 overflow-y-auto bg-black/20 custom-scrollbar">
        <EditorContent editor={editor} />
      </div>

      {/* 3. Status Bar */}
      <div className="bg-white/5 border-t border-white/10 px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
            Words
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-500 uppercase tracking-widest">
          Node_Status: Online
        </span>
      </div>
    </div>
  );
}
