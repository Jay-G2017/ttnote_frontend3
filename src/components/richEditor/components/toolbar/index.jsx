import React, { useState } from 'react';
import EditorButton from '../editorButton';
import styles from './styles.less';

import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import { isLinkActive, wrapLink, unwrapLink } from '../../plugins/withLink';
import LinkModal from '../linkModal';

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

  const [linkModalVisible, setLinkModalVisible] = useState(false);

  const linkBtnDisabled = !editor.selection

  const handleLinkOk = (form) => {
    if (!form.url) {
      setLinkModalVisible(false)
      return
    }

    if (editor.selection) {
      wrapLink(editor, form.url, form.label);
    }

    setLinkModalVisible(false)
  }

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
        disabled={linkBtnDisabled}
        type={isLinkActive(editor) ? 'unlink' : 'link'}
        onMouseDown={(event) => {
          event.preventDefault();
          if (linkBtnDisabled) return
          if (isLinkActive(editor)) {
            unwrapLink(editor);
          } else {
            setLinkModalVisible(true);
            // const url = window.prompt('Enter the URL of the link:');
            // if (!url) return;
            // if (editor.selection) {
            //   wrapLink(editor, url);
            // }
          }
        }}
        active={isLinkActive(editor)}
      />
      <LinkModal
        visible={linkModalVisible}
        onCancel={() => setLinkModalVisible(false)}
        onOk={handleLinkOk}
      />
    </div>
  );
};

export default Toolbar;
