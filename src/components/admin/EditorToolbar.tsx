"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  Undo2Icon,
  Redo2Icon,
  Table as TableIcon,
  Type,
  Printer,
  Trash2,
  RemoveFormattingIcon,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Highlighter,
  Palette,
  List,
  ListOrdered,
  Quote,
  Minus,
  Columns,
  Rows,
  Plus,
} from "lucide-react";
export const EditorToolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

const setLink = () => {
  const previousUrl = editor.getAttributes("link").href;
  let url = window.prompt("Enter URL (include https://)", previousUrl);

  // If user cancelled
  if (url === null) return;

  // If user cleared the link
  if (url === "") {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    return;
  }

  // Automatic protocol prefixing
  if (!/^https?:\/\//i.test(url)) {
    url = `https://${url}`;
  }

  editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
};

  const insertTable = () => {
    const rows = parseInt(window.prompt("Number of rows?", "3") || "3");
    const cols = parseInt(window.prompt("Number of columns?", "3") || "3");
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  return (
    <div className="flex border-b border-white/10 bg-[#0A0A0A] p-1 sticky top-0 z-50">
      {/* -------------- */}

      {/* ---------- */}
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
        <MenubarMenu>
          <MenubarTrigger className="toolbar-trigger">Insert</MenubarTrigger>
          <MenubarContent className="menubar-dark">
            <MenubarSub>
              <MenubarSubTrigger>
                <TableIcon className="toolbar-icon" /> Table Tools
              </MenubarSubTrigger>
              <MenubarSubContent className="menubar-dark">
                <MenubarItem onClick={insertTable}>
                  <Plus className="size-4 mr-2" /> New Table
                </MenubarItem>
                <MenubarSeparator className="bg-white/5" />
                <MenubarItem
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  <Columns className="size-4 mr-2" /> Add Column
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  <Rows className="size-4 mr-2" /> Add Row
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="toolbar-icon" /> Bullet List
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="toolbar-icon" /> Ordered List
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
              <Quote className="toolbar-icon" /> Blockquote
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus className="toolbar-icon" /> Horizontal Rule (Divider)
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="toolbar-trigger">System</MenubarTrigger>
          <MenubarContent className="menubar-dark">
            <MenubarItem onClick={() => window.print()}>
              <Printer className="toolbar-icon" /> Print
            </MenubarItem>
            <MenubarSeparator className="bg-white/5" />
            <MenubarItem
              onClick={() => editor.chain().focus().clearContent().run()}
              className="text-red-500"
            >
              <Trash2 className="toolbar-icon" /> Reset
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="toolbar-trigger">Edit</MenubarTrigger>
          <MenubarContent className="menubar-dark">
            <MenubarItem onClick={() => editor.chain().focus().undo().run()}>
              <Undo2Icon className="toolbar-icon" /> Undo
            </MenubarItem>
            <MenubarItem onClick={() => editor.chain().focus().redo().run()}>
              <Redo2Icon className="toolbar-icon" /> Redo
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="toolbar-trigger">Insert</MenubarTrigger>
          <MenubarContent className="menubar-dark">
            <MenubarItem onClick={insertTable}>
              <TableIcon className="toolbar-icon" /> Custom Table
            </MenubarItem>
            <MenubarItem onClick={setLink}>
              <LinkIcon className="toolbar-icon" /> Add Link
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code className="toolbar-icon" /> Code Block
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="toolbar-trigger">Format</MenubarTrigger>
          <MenubarContent className="menubar-dark">
            <MenubarSub>
              <MenubarSubTrigger>
                <Type className="toolbar-icon" /> Headings
              </MenubarSubTrigger>
              <MenubarSubContent className="menubar-dark">
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                  }
                >
                  <Heading1 className="size-4 mr-2" /> H1
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                  }
                >
                  <Heading2 className="size-4 mr-2" /> H2
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                  }
                >
                  <Heading3 className="size-4 mr-2" /> H3
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarSeparator className="bg-white/5" />

            <MenubarSub>
              <MenubarSubTrigger>
                <Palette className="toolbar-icon" /> Text Color
              </MenubarSubTrigger>
              <MenubarSubContent className="menubar-dark">
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().setColor("#00FF94").run()
                  }
                >
                  Emerald (Brand)
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().setColor("#3B82F6").run()
                  }
                >
                  Blue
                </MenubarItem>
                <MenubarItem
                  onClick={() =>
                    editor.chain().focus().setColor("#EF4444").run()
                  }
                >
                  Red
                </MenubarItem>
                <MenubarItem
                  onClick={() => editor.chain().focus().unsetColor().run()}
                >
                  Default
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHighlight({ color: "#262626" })
                  .run()
              }
            >
              <Highlighter className="toolbar-icon" /> Highlight
            </MenubarItem>

            <MenubarItem
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            >
              <UnderlineIcon className="toolbar-icon" /> Underline{" "}
              <MenubarShortcut>⌘U</MenubarShortcut>
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <StrikethroughIcon className="toolbar-icon" /> Strikethrough
            </MenubarItem>

            <MenubarSeparator className="bg-white/5" />

            <MenubarItem
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <BoldIcon className="toolbar-icon" /> Bold
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <ItalicIcon className="toolbar-icon" /> Italic
            </MenubarItem>
            <MenubarItem
              onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="toolbar-icon" /> Clear
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
