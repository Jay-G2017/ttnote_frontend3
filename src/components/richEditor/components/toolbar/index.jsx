import React, { useState, useRef } from 'react'
import EditorButton from '../editorButton'
import styles from './styles.less'

import { useSlate } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { isLinkActive, handleLinkClick } from '../../plugins/withLink'
import useLinkModal from '../useLinkModal'
import { Popover } from 'antd'
import PopMenuItem from './PopMenuItem'
import { get } from 'lodash'

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

const getHeadingType = (editor) => {
  const [node] = Editor.nodes(editor, {
    match: (n) => !!n.type && n.type !== 'link',
  })
  return get(node, '[0].type', 'p')
}

const Toolbar = (props) => {
  const editor = useSlate()

  const linkBtnDisabled = !editor.selection

  const [modal, setLinkState] = useLinkModal(props.setDSelection)

  // const [pType, setPType] = useState('p')
  const pType = getHeadingType(editor)
  // 段落按钮的弹框受控
  const [popVisible, setPopVisible] = useState(false)
  const popShowRef = useRef()

  const showPop = () => {
    setPopVisible(true)
    popShowRef.current = true
  }

  const delayHidePop = ({ delayTime = 300 }) => {
    popShowRef.current = false

    if (delayTime <= 0) {
      setPopVisible(false)
      return
    }

    setTimeout(() => {
      if (!popShowRef.current) {
        setPopVisible(false)
      }
    }, delayTime)
  }

  const handlePClick = (type) => {
    Transforms.setNodes(editor, { type })
    delayHidePop({ delayTime: 0 })
  }

  const menu = (
    <div onMouseEnter={showPop} onMouseLeave={delayHidePop}>
      <PopMenuItem
        type="p"
        active={pType === 'p'}
        onClick={() => handlePClick('p')}
      />
      {/* 生成h1-h6 */}
      {Array.from(Array(6).keys()).map((i) => {
        const type = `h${i + 1}`
        return (
          <PopMenuItem
            key={i}
            type={type}
            active={pType === type}
            onClick={() => handlePClick(type)}
          />
        )
      })}
    </div>
  )

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbarArea}>
        <Popover
          visible={popVisible}
          content={menu}
          placement="bottomLeft"
          overlayClassName="myPop"
        >
          <div onMouseEnter={showPop} onMouseLeave={delayHidePop}>
            <EditorButton type={pType} />
          </div>
        </Popover>
      </div>
      <div className={styles.toolbarArea}>
        <EditorButton
          type="bold"
          onMouseDown={(event) => {
            event.preventDefault()
            toggleMark(editor, 'bold')
          }}
          active={isMarkActive(editor, 'bold')}
        />
        <EditorButton
          type="italic"
          onMouseDown={(event) => {
            event.preventDefault()
            toggleMark(editor, 'italic')
          }}
          active={isMarkActive(editor, 'italic')}
        />
        <EditorButton type="strikethrough" />
        <EditorButton
          type="underline"
          onMouseDown={(event) => {
            event.preventDefault()
            toggleMark(editor, 'underline')
          }}
          active={isMarkActive(editor, 'underline')}
        />
        <EditorButton
          type="code"
          onMouseDown={(event) => {
            event.preventDefault()
            toggleMark(editor, 'code')
          }}
          active={isMarkActive(editor, 'code')}
        />
        <EditorButton
          disabled={linkBtnDisabled}
          type={isLinkActive(editor) ? 'unlink' : 'link'}
          onMouseDown={(event) => {
            event.preventDefault()
            handleLinkClick(editor, setLinkState)
          }}
          active={isLinkActive(editor)}
        />
        {modal}
      </div>
    </div>
  )
}

export default Toolbar
