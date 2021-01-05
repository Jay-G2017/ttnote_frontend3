import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate, ReactEditor, useSlate } from 'slate-react'
import { Editor, Transforms, createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import withLinks, { handleLinkClick } from './plugins/withLink'
import styles from './styles.less'

import { message, Popover } from 'antd'
import Toolbar from './components/toolbar'
import EditorSmallButton from './components/editorSmallButton'
import useLinkModal from './components/useLinkModal'
import JSONTree from 'react-json-tree'
import { normalizeUrl } from '../../utils/url'
import Clipboard from 'clipboard'

// import { Button, Icon, Toolbar } from '../components';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+l': 'link',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

const deserialize = (string) => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map((line) => {
    return {
      children: [{ text: line }],
    }
  })
}

const unChanged = (oldVal, newVal) => {
  return serialize(oldVal) === serialize(newVal)
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}

const RichEditor = (props) => {
  const defaultValue = props.defaultValue || initialValue
  const [value, setValue] = useState(defaultValue)

  const renderElement = useCallback((props) => <Element {...props} />, [])
  const renderLeaf = useCallback((props) => <Leaf {...props} />, [])
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  )

  const [modal, setLinkState] = useLinkModal()

  // console.log('editor', editor);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(val) => {
        setValue(val)
        console.log('selection', editor.selection)
        if (props.onChange) props.onChange(val)
      }}
    >
      <div style={{ backgroundColor: '#fff' }}>
        <JSONTree data={value} shouldExpandNode={() => true} hideRoot={true} />
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
                event.preventDefault()
                const mark = HOTKEYS[hotkey]
                // 链接快捷键
                if (mark === 'link') {
                  handleLinkClick(editor, setLinkState)
                } else {
                  toggleMark(editor, mark)
                }
              }
            }
          }}
        />
        {modal}
      </div>
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  })

  return !!match
}

const Element = (props) => {
  const [popoverShow, setPopoverShow] = useState(false)
  const popShowRef = useRef()
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>
    case 'list-item':
      return <li {...attributes}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>
    case 'link':
      // url前面如果没有http或https, 则默认前面加上https://
      const href = normalizeUrl(element.url)

      const showPop = () => {
        setPopoverShow(true)
        popShowRef.current = true
      }

      const delayHidePop = ({ delayTime = 300 }) => {
        popShowRef.current = false

        if (delayTime <= 0) {
          setPopoverShow(false)
          return
        }

        setTimeout(() => {
          if (!popShowRef.current) {
            setPopoverShow(true)
          }
        }, delayTime)
      }

      return (
        <Popover
          overlayStyle={{ zIndex: 1051 }}
          overlayClassName="richEditor"
          content={
            <LinkContent
              element={element}
              delayHidePop={delayHidePop}
              showPop={showPop}
            />
          }
          placement="bottom"
          visible={popoverShow}
        >
          <a
            {...attributes}
            href={href}
            onClick={() => window.open(href, '_blank')}
            onMouseEnter={showPop}
            onMouseLeave={delayHidePop}
          >
            {children}
          </a>
        </Popover>
      )
    default:
      return <p {...attributes}>{children}</p>
  }
}

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }

  return <span {...attributes}>{children}</span>
}

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
]

const LinkContent = (props) => {
  const editor = useSlate()
  const { element, showPop, delayHidePop } = props
  const { children } = element
  const [modal, setLinkState] = useLinkModal()

  const label = children[0].text
  const path = ReactEditor.findPath(editor, element)
  const anchor = { path: path.concat(0), offset: 0 }
  const focus = { path: path.concat(0), offset: label.length }

  const selection = { anchor, focus }

  useEffect(() => {
    const btnCopy = new Clipboard('btnCopy')
    btnCopy.on('success', function (e) {
      message.success('复制成功', 0.6)
      delayHidePop({ delayTime: 0 })
    })

    // 复制失败后执行的回调函数
    btnCopy.on('error', function (e) {})

    return () => {
      btnCopy.destroy()
    }
  })

  return (
    <div className="flexRow" onMouseEnter={showPop} onMouseLeave={delayHidePop}>
      <div>
        <a
          href={normalizeUrl(element.url)}
          target={'_blank'}
          onClick={() => window.open(normalizeUrl(element.url), '_blank')}
        >
          {normalizeUrl(element.url)}
        </a>
      </div>
      <EditorSmallButton
        onClick={() => {
          console.log('selection', selection)
          setLinkState({
            visible: true,
            selection,
            defaultLabel: label,
            defaultUrl: element.url,
            type: 'edit',
          })
          delayHidePop({ delayTime: 0 })
        }}
        style={{ marginLeft: '10px' }}
        type="edit"
      />
      <EditorSmallButton
        className="btnCopy"
        dataClipboardText={element.url}
        style={{ marginLeft: '4px' }}
        type="copy"
        onClick={() => {}}
      />
      <EditorSmallButton
        style={{ marginLeft: '4px' }}
        type="unlink"
        onClick={(e) => {
          e.preventDefault()
          delayHidePop({ delayTime: 0 })
          setTimeout(() => {
            Transforms.unwrapNodes(editor, {
              at: selection,
              match: (n) => n.type === 'link',
            })
          }, 0)
        }}
      />
      {modal}
    </div>
  )
}

export default RichEditor
