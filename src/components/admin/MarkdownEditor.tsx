"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-black/20 animate-pulse rounded-[2.5rem] border border-white/5 flex items-center justify-center">
      <span className="text-white/20 font-mono text-xs tracking-widest uppercase">
        Initializing_Markdown_Engine...
      </span>
    </div>
  ),
});

interface MarkdownEditorProps {
  content: string;
  onChange: (value: string) => void;
}

export function MarkdownEditor({ content, onChange }: MarkdownEditorProps) {
  const options = useMemo(() => {
    return {
      spellChecker: false,
      autosave: {
        enabled: true,
        uniqueId: "mayur_blog_editor",
        delay: 1000,
      },
      previewClass: "custom-mde-preview",
      // STICKY LOGIC START
      minHeight: "500px",
      maxHeight: "500px", // Fixed height forces internal scroll
      toolbarSticky: true,
      toolbarStickyOffset: 0, // Adjust this if you have a floating navbar (e.g., 80)
      // STICKY LOGIC END
      placeholder: "SYSTEM_INPUT: Start writing technical logs...",
      status: ["lines", "words", "cursor"],
      renderingConfig: {
        codeSyntaxHighlighting: true,
      },
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "code",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        "image",
        "table",
        "|",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],
    };
  }, []);

  return (
    <div className="relative w-full border border-white/10 rounded-[2.5rem] overflow-hidden bg-[#080808] shadow-2xl focus-within:border-blue-500/30">
      <div className="bg-white/5 px-8 py-3 border-b border-white/5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
            Mode: RAW_MARKDOWN_V1
          </span>
        </div>
        <span className="text-[9px] font-mono text-white/10 uppercase tracking-widest">
          Internal_Scroll_Enabled
        </span>
      </div>

      <div className="custom-mde-container">
        <SimpleMDE
          value={content}
          onChange={onChange}
          options={options as any}
        />
      </div>

      <style jsx global>{`
        /* Force Internal Scrollbar */
        .CodeMirror-scroll {
          min-height: 500px;
          max-height: 500px;
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }

        /* Toolbar Sticky Styling */
        .editor-toolbar.sticky {
          position: fixed;
          top: 0;
          left: auto;
          width: 100%; /* You might need to adjust this depending on container */
          z-index: 50;
          background: #0a0a0a !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }

        /* REST OF YOUR STYLES... */
        .editor-toolbar {
          background: #0a0a0a !important;
          border: none !important;
          padding: 10px 20px !important;
        }
        .CodeMirror {
          background: transparent !important;
          color: #eee !important;
          border: none !important;
          font-family: "JetBrains Mono", monospace !important;
          padding: 20px 40px !important;
          font-size: 15px !important;
        }
        .custom-mde-preview {
          background: #050505 !important;
          color: white !important;
          padding: 40px !important;
        }
        .editor-statusbar {
          background: #080808 !important;
          border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
          color: #444 !important;
        }
      `}</style>
    </div>
  );
}
