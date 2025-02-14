import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import Link from '@tiptap/extension-link'
import ListItem from "@tiptap/extension-list-item";

import { useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";

const TextEditor = forwardRef(({ content, onChange }, ref) => {
    const editor = useEditor({
        extensions: [BulletList, ListItem, StarterKit.configure({
            bulletList: false, 
        }), Bold, Italic, Underline, Link.configure({ openOnClick: true, defaultProtocol: 'https', HTMLAttributes: { target: "_blank" } })],
        content: content || "<p></p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useImperativeHandle(ref, () => ({
        toggleBold: () => editor?.chain().focus().toggleBold().run(),
        toggleItalic: () => editor?.chain().focus().toggleItalic().run(),
        toggleUnderline: () => editor?.chain().focus().toggleUnderline().run(),
        toggleBulletList: () => editor?.chain().focus().toggleBulletList().run(),
        setLink: (url) => {
            if (!url) return;
            editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
          },
          unsetLink: () => {
            editor?.chain().focus().unsetLink().run();
          }
    }));

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="py-4">
            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
});

export default TextEditor;
