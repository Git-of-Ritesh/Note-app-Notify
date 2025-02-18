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
import Image from '@tiptap/extension-image'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextAlign from '@tiptap/extension-text-align'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { common, createLowlight } from 'lowlight'
import { useEffect } from "react";
import { forwardRef, useImperativeHandle } from "react";



const TextEditor = forwardRef(({ content, onChange }, ref) => {

    const lowlight = createLowlight(common)

    const editor = useEditor({
        extensions: [BulletList, ListItem, StarterKit.configure({
            bulletList: false,
            codeBlock: false,
            bold: false,
            italic: false,
            listItem: false,
        }),
            Bold, Italic, Underline,
            Link.configure({ openOnClick: true, defaultProtocol: 'https', autolink: false, HTMLAttributes: { target: "_blank" } }),
            Highlight.configure({ multicolor: true, HTMLAttributes: { class: "bg-yellow-300 text-black px-1" }, }), CodeBlockLowlight.configure({
                lowlight,
            }),
            Image.configure({
                allowBase64: true,  // Allow base64 images if needed
            }), TaskList,
            TaskItem.configure({
                nested: true,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'right', 'center'],
              }),
              Table.configure({
                resizable: true,
              }),
              TableRow,
              TableHeader,
              TableCell,],
        content: content || "<p></p>",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    useImperativeHandle(ref, () => ({
        toggleBold: () => {editor?.chain().focus().toggleBold().run(); 
            setTimeout(() => editor?.isActive("bold"), 0);
            return editor?.isActive("bold")},
            isActive: (type) => editor?.isActive(type),
        toggleItalic: () => {editor?.chain().focus().toggleItalic().run(); 
            setTimeout(() => editor?.isActive("italic"), 0);
            return editor?.isActive("italic");
        },
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
        toggleStrike: () => editor?.chain().focus().toggleStrike().run(),
        addImage: () => {
            const url = window.prompt('URL')

            if (url) {
                editor?.chain().focus().setImage({
                    src: url, width: 500,  // Set default width 
                    height: 300
                }).run()
            }
        },
        toggleTaskList: () => editor?.chain().focus().toggleList("taskList", "taskItem").run(),
        setTextAlignLeft: () => editor?.chain().focus().setTextAlign('left').run(),
        setTextAlignCenter: () => editor?.chain().focus().setTextAlign('center').run(),
        setTextAlignRight: () => editor?.chain().focus().setTextAlign('right').run(),
        insertTable: () => editor?.chain().focus().insertTable({rows : 2, cols : 2, withHeaderRow: true}).run(),
        deleteTable: () =>  editor?.chain().focus().deleteTable().run(),
        addRowAfter: () => editor?.chain().focus().addRowAfter().run(),
        addColumnAfter: () => editor?.chain().focus().addColumnAfter().run(),
        deleteRow: () => editor?.chain().focus().deleteRow().run(),
        deleteColumn: () => editor?.chain().focus().deleteColumn().run(),
        mergeCells: () => editor?.chain().focus().mergeCells().run(),
        splitCell: () => editor?.chain().focus().splitCell().run(),
        toggleHeaderColumn: () => editor?.chain().focus().toggleHeaderColumn().run(),
        toggleHeaderCell: () => editor?.chain().focus().toggleHeaderCell().run(),
    }));

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) return null;

    return (
        <div className="[&_h1]:text-2xl [&_h2]:text-xl [&_h3]:text-lg 
        [&_ol]:list-decimal [&_ol]:pl-3 [&_li]:ml-4 
        [&_pre]:bg-gray-800 [&_pre]:border [&_pre]:border-gray-700 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:shadow-lg [&_pre]:overflow-x-auto 
        [&_code]:text-white [&_code]:font-mono [&_code]:text-sm 
        [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:border [&_img]:border-gray-300 [&_img]:shadow-md [&_img]:mx-auto [&_img]:block
         [&_ul[data-type='taskList']]:list-none [&_ul[data-type='taskList']]:pl-0 
                [&_li[data-type='taskItem']]:flex [&_li[data-type='taskItem']]:items-start 
                [&_li[data-type='taskItem']]:gap-2 
                [&_li[data-type='taskItem']>label]:cursor-pointer 
                [&_li[data-type='taskItem']>div]:flex-1 pt-4">
            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    );
});

export default TextEditor;
