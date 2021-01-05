import isUrl from 'is-url'
import { Editor, Transforms, Range } from 'slate'
import { ReactEditor } from 'slate-react'

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' })
  return !!link
}

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => n.type === 'link',
  })
}

export const wrapLink = (editor, selection, { url, label, type }) => {
  ReactEditor.focus(editor)
  Transforms.select(editor, selection)
  const text = label ? label : url

  if (type === 'edit') {
    Transforms.setNodes(
      editor,
      { url },
      { match: (node) => node.type === 'link' }
    )
    Transforms.insertText(editor, text)
    return
  }

  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.insertText(editor, text)
    Transforms.collapse(editor, { edge: 'end' })
  }
}

export const handleLinkClick = (editor, setLinkState) => {
  if (!editor.selection) return

  if (isLinkActive(editor)) {
    unwrapLink(editor)
  } else {
    setLinkState({ visible: true, selection: editor.selection })
  }
}

const withLinks = (editor) => {
  const { isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  return editor
}

export default withLinks
