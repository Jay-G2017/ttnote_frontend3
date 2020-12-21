import isUrl from 'is-url'
import { Editor, Transforms, Range } from 'slate'
import { ReactEditor } from 'slate-react'

export const isLinkActive = (editor) => {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === 'link' })
  return !!link
}

export const unwrapLink = (editor) => {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === 'link' })
}

export const wrapLink = (editor, selection, url, label) => {
  const text = label ? label : url

  const isCollapsed = selection && Range.isCollapsed(selection)
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text }] : [],
  }

  ReactEditor.focus(editor)
  Transforms.select(editor, selection)
  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
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
  const { insertData, insertText, isInline } = editor

  editor.isInline = (element) => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data) => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

export default withLinks
