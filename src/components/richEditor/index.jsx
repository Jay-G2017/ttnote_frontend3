import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact, Slate, ReactEditor, useSlate } from 'slate-react'
import { Editor, Transforms, createEditor, Node } from 'slate'
import { withHistory } from 'slate-history'
import withLinks, { handleLinkClick } from './plugins/withLink'
import styles from './styles.less'
import classnames from 'classnames'

import { message, Popover } from 'antd'
import Toolbar from './components/toolbar'
import EditorSmallButton from './components/editorSmallButton'
import useLinkModal from './components/useLinkModal'
import { normalizeUrl } from '../../utils/url'
import Clipboard from 'clipboard'
import { isHeading } from './utils'
import { useSize } from 'ahooks'

// import { Button, Icon, Toolbar } from '../components';

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
  'mod+l': 'link',
  'mod+alt+p': 'p',
  'mod+alt+1': 'h1',
  'mod+alt+2': 'h2',
  'mod+alt+3': 'h3',
  'mod+alt+4': 'h4',
}

const serialize = (value) => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map((n) => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}

const textChanged = (oldVal, newVal) => {
  return serialize(oldVal) !== serialize(newVal)
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
  const editor = useMemo(
    () => withLinks(withHistory(withReact(createEditor()))),
    []
  )

  // 监听富文本框的宽度
  const editorRef = useRef()
  const size = useSize(editorRef)

  // console.log('editor', editor);

  const [dSelection, setDSelection] = useState(null)
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = []
      if (dSelection && dSelection.anchor.path.toString() === path.toString()) {
        ranges.push({
          ...dSelection,
          dSelected: true,
        })
      }
      return ranges.slice(0, 1)
    },
    [dSelection]
  )

  const [modal, setLinkState] = useLinkModal(setDSelection)

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(val) => {
        setValue(val)
        if (props.onChange && textChanged(value, val)) props.onChange(val)
      }}
    >
      <div ref={editorRef} style={{ backgroundColor: '#fff' }}>
        <Toolbar setDSelection={setDSelection} />
        <Editable
          className={classnames({
            [styles.editorBody]: true,
            [styles.pcStyle]: size.width > 668,
            [styles.mobileStyle]: size.width < 668,
          })}
          decorate={decorate}
          renderElement={renderElement}
          renderLeaf={(props) => <Leaf {...props} />}
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
                } else if (isHeading(mark)) {
                  Transforms.setNodes(editor, { type: mark })
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

const Element = (props) => {
  const [popoverShow, setPopoverShow] = useState(false)
  const popShowRef = useRef()
  const { attributes, children, element } = props
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>
    case 'h1':
      return <h1 {...attributes}>{children}</h1>
    case 'h2':
      return <h2 {...attributes}>{children}</h2>
    case 'h3':
      return <h3 {...attributes}>{children}</h3>
    case 'h4':
      return <h4 {...attributes}>{children}</h4>
    case 'h5':
      return <h5 {...attributes}>{children}</h5>
    case 'h6':
      return <h6 {...attributes}>{children}</h6>
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
            setPopoverShow(false)
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
            onMouseDown={(e) => {
              e.preventDefault()
              window.open(href, '_blank')
            }}
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

  return (
    <span
      className={classnames({ [styles.dSelected]: leaf.dSelected })}
      {...attributes}
    >
      {children}
    </span>
  )
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
  const { children, url } = element
  const href = normalizeUrl(url)
  const [modal, setLinkState] = useLinkModal()

  const label = children[0].text
  const path = ReactEditor.findPath(editor, element)
  const anchor = { path: path.concat(0), offset: 0 }
  const focus = { path: path.concat(0), offset: label.length }

  const selection = { anchor, focus }

  useEffect(() => {
    const linkCopy = new Clipboard('#linkCopy')
    linkCopy.on('success', function (e) {
      message.success('复制成功', 0.6)
      delayHidePop({ delayTime: 0 })
    })

    // 复制失败后执行的回调函数
    linkCopy.on('error', function (e) {
      message.error('复制失败', 0.6)
    })

    return () => {
      linkCopy.destroy()
    }
  })

  return (
    <div className="flexRow" onMouseEnter={showPop} onMouseLeave={delayHidePop}>
      <div>
        <a
          href={href}
          target={'_blank'}
          onMouseDown={(e) => {
            e.preventDefault()
            window.open(href, '_blank')
          }}
        >
          {href}
        </a>
      </div>
      <EditorSmallButton
        onClick={() => {
          setLinkState({
            visible: true,
            selection,
            defaultLabel: label,
            defaultUrl: url,
            type: 'edit',
          })
          delayHidePop({ delayTime: 0 })
        }}
        style={{ marginLeft: '10px' }}
        type="edit"
      />
      <EditorSmallButton
        id="linkCopy"
        dataClipboardText={href}
        style={{ marginLeft: '4px' }}
        type="copy"
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
