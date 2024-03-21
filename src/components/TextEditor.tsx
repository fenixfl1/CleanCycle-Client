import React, { forwardRef } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { Sources } from 'quill';

interface TextEditorProps {
  style?: React.CSSProperties;
  htmlContent?: string;
  title?: React.ReactNode;
  placeholder?: string;
  theme?: 'snow' | 'bubble';
  onChange?(value: string): void;
  onBlur?(
    previousSelection: ReactQuill.Range,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ): void;
}

const TextEditor = forwardRef<ReactQuill, TextEditorProps>(
  (
    {
      htmlContent = '',
      title,
      placeholder = 'Escribe algo...',
      onChange,
      onBlur,
      theme = 'snow',
      ...props
    },
    ref,
  ) => {
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
          { list: 'ordered' },
          { list: 'bullet' },
          { indent: '-1' },
          { indent: '+1' },
        ],
        ['link'],
        ['code-block'],
        ['clean'],
        ['image'],
      ],
    };

    const formats = [
      'header',
      'font',
      'size',
      'bold',
      'italic',
      'underline',
      'align',
      'strike',
      'script',
      'blockquote',
      'background',
      'list',
      'bullet',
      'indent',
      'link',
      'image',
      'color',
      'code-block',
    ];

    return (
      <ReactQuill
        onBlur={onBlur}
        formats={formats}
        modules={modules}
        onChange={onChange}
        placeholder={placeholder}
        ref={ref}
        theme={theme}
        value={htmlContent}
        {...props}
      />
    );
  },
);

export default TextEditor;
