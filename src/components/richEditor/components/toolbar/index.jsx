import React from 'react';
import EditorButton from '../editorButton';
import styles from './styles.less';

import { useSlate } from 'slate-react';
import { Editor, Transforms, Range } from 'slate';

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Toolbar = (props) => {
  const editor = useSlate();
  return (
    <div className={styles.toolbar}>
      <EditorButton
        type="bold"
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'bold');
        }}
        active={isMarkActive(editor, 'bold')}
      />
      <EditorButton
        type="italic"
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'italic');
        }}
        active={isMarkActive(editor, 'italic')}
      />
      <EditorButton type="strikethrough" />
      <EditorButton
        type="underline"
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'underline');
        }}
        active={isMarkActive(editor, 'underline')}
      />
      <EditorButton
        type="code"
        onMouseDown={(event) => {
          event.preventDefault();
          toggleMark(editor, 'code');
        }}
        active={isMarkActive(editor, 'code')}
      />
      <EditorButton
        type={isLinkActive(editor) ? 'unlink' : 'link'}
        onMouseDown={(event) => {
          event.preventDefault();
          const url = window.prompt('Enter the URL of the link:');
          if (!url) return;
          insertLink(editor, url);
        }}
        active={isLinkActive(editor)}
      />
    </div>
  );
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return !!link;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' });
};

export default Toolbar;
