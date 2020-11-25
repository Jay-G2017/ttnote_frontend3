import React from 'react';
import EditorButton from '../editorButton';
import styles from './styles.less';

import { useSlate } from 'slate-react';
import { Editor } from 'slate';

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
      <EditorButton type="link" />
      <EditorButton type="unlink" />
    </div>
  );
};

export default Toolbar;
