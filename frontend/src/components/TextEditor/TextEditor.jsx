import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import Link from '@tiptap/extension-link'
import ListItem from "@tiptap/extension-list-item";
import Highlight from '@tiptap/extension-highlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { common, createLowlight } from 'lowlight'
import { useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";



const TextEditor = forwardRef(({ content, onChange }, ref) => {

    const lowlight = createLowlight(common)

    const editor = useEditor({
        extensions: [BulletList, ListItem, StarterKit.configure({
            bulletList: false,
        }), Bold, Italic, Underline, Link.configure({ openOnClick: true, defaultProtocol: 'https', autolink: false, HTMLAttributes: { target: "_blank" } }), Highlight.configure({ multicolor: true, HTMLAttributes: { class: "bg-yellow-300 text-black px-1" }, }), CodeBlockLowlight.configure({
            lowlight,
        }),],
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
        },
        toggleHighlight: () => editor?.chain().focus().toggleHighlight().run(),
        toggleBlockquote: () => editor?.chain().focus().toggleBlockquote().run(),
        toggleHeadingL1: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
        toggleHeadingL2: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
        toggleHeadingL3: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        setHorizontalRule: () => editor?.chain().focus().setHorizontalRule().run(),
        toggleOrderedList: () => editor?.chain().focus().toggleOrderedList().run(),
        toggleCodeBlock: () => editor?.chain().focus().toggleCodeBlock().run(),
        toggleStrike: ()  => editor?.chain().focus().toggleStrike().run(),
    }));

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="[&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg [&_ol]:list-decimal [&_ol]:pl-3 [&_li]:ml-4 [&_pre]:bg-gray-800 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:shadow-lg [&_pre]:overflow-x-auto [&_code]:text-white [&_code]:font-mono [&_code]:text-sm pt-4">
            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
});

export default TextEditor;
