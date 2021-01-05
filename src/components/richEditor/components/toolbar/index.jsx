import React from 'react'
import EditorButton from '../editorButton'
import styles from './styles.less'

import { useSlate } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { isLinkActive, handleLinkClick } from '../../plugins/withLink'
import useLinkModal from '../useLinkModal'
import { Button } from 'antd'

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

const Toolbar = (props) => {
  const editor = useSlate()

  const linkBtnDisabled = !editor.selection

  const [modal, setLinkState] = useLinkModal()

  return (
    <div className={styles.toolbar}>
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
      <Button
        onClick={() => {
          Transforms.insertText(editor, 'hello')
        }}
      >
        insert hello
      </Button>
      <Button
        onClick={() => {
          Transforms.insertFragment(editor, [
            { children: [{ text: 'dog ', bold: true }, { text: 'bear' }] },
          ])
        }}
      >
        insert bold dog
      </Button>
    </div>
  )
}

export default Toolbar
