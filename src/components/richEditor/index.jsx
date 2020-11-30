import React, { useCallback, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import isUrl from 'is-url';
import { Editable, withReact, useSlate, Slate } from 'slate-react';
import { Editor, Transforms, createEditor, Range, Node } from 'slate';
import { withHistory } from 'slate-history';
import styles from './styles.less';

import styled from 'styled-components';
import { Popover } from 'antd';
import LinkModal from './components/linkModal';
import Toolbar from './components/toolbar';
import EditorSmallButton from './components/editorSmallButton';

// import { Button, Icon, Toolbar } from '../components';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  );
};

const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    };
  });
};

const unChanged = (oldVal, newVal) => {
  return serialize(oldVal) === serialize(newVal);
};

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

const RichEditor = (props) => {
  const defaultValue = props.defaultValue || initialValue;
  const [value, setValue] = useState(defaultValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  );

  console.log('editor', editor);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(val) => {
        console.log('onChange', value, val);
        setValue(val);
        if (props.onChange) props.onChange(val);
      }}
    >
      <div style={{ backgroundColor: '#fff' }}>
        <Toolbar />
        <Editable
          className={styles.editorBody}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder={props.placeholder}
          spellCheck
          onKeyDown={(event) => {
            for (const hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </div>
    </Slate>
  );
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'link':
      return (
        <Popover
          overlayStyle={{ zIndex: 1051 }}
          overlayClassName='richEditor'
          content={<LinkContent url={element.url} />}
          placement="bottom"
        >
          <a
            {...attributes}
            target={'_blank'}
            href={element.url}
            onClick={() => window.open(element.url, '_blank')}
          >
            {children}
          </a>
        </Popover>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

// const BlockButton = ({ format, icon }) => {
//   const editor = useSlate();
//   return (
//     <Button
//       active={isBlockActive(editor, format)}
//       onMouseDown={(event) => {
//         event.preventDefault();
//         toggleBlock(editor, format);
//       }}
//     >
//       <Icon>{icon}</Icon>
//     </Button>
//   );
// };

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }],
  },
];

const withLinks = (editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' });
  return !!link;
};

const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' });
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

const LinkContent = (props) => {
  const { url } = props;
  return (
    <div className="flexRow">
      <div>{url}</div>
      <EditorSmallButton style={{ marginLeft: '10px' }} type="edit" />
      <EditorSmallButton style={{ marginLeft: '4px' }} type="copy" />
      <EditorSmallButton style={{ marginLeft: '4px' }} type="unlink" />
    </div>
  );
};

export default RichEditor;
