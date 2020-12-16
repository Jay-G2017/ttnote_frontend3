import React, { useCallback, useState } from 'react';
import EditorButton from '../editorButton';
import styles from './styles.less';

import { useSlate, ReactEditor } from 'slate-react';
import { Editor, Transforms } from 'slate';
import { isLinkActive, wrapLink, unwrapLink } from '../../plugins/withLink';
import LinkModal from '../linkModal';
import { Button } from 'antd';
import isUrl from 'is-url'

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
  const [linkSelection, setLinkSelection] = useState({});

  const linkBtnDisabled = !editor.selection;

  const handleLinkOk = useCallback((form) => {
    if (!form.url) {
      setLinkModalVisible(false);
      return;
    }

    if (linkSelection) {
      wrapLink(editor, linkSelection, form.url, form.label);
    }

    setLinkModalVisible(false);
  }, [editor, linkSelection]);

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
          if (linkBtnDisabled) return;
          if (isLinkActive(editor)) {
            unwrapLink(editor);
          } else {
            setLinkModalVisible(true);
            setLinkSelection(editor.selection);
          }
        }}
        active={isLinkActive(editor)}
      />
      <LinkModal
        visible={linkModalVisible}
        onCancel={() => setLinkModalVisible(false)}
        onOk={handleLinkOk}
      />
      <Button
        onClick={() => {
          console.log('editor', editor);
          const selection = {
            anchor: { offset: 0, path: [0, 0] },
            focus: { offset: 3, path: [0, 0] },
          };
          ReactEditor.focus(editor);
          Transforms.select(editor, selection);
        }}
      >
        insert
      </Button>
    </div>
  );
};

export default Toolbar;
