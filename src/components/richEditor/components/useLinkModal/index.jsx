import React, { useState, useEffect, useCallback } from 'react'
import { Modal, Input, Button } from 'antd'
import styles from './styles.less'
import { useSlate } from 'slate-react'
import { wrapLink } from '../../plugins/withLink'

function useLinkModal() {
  const [linkState, setLinkState] = useState({
    visible: false,
    selection: null,
  })

  return [
    <LinkModal linkState={linkState} setLinkState={setLinkState} />,
    setLinkState,
  ]
}

export default useLinkModal

function LinkModal(props) {
  const { linkState, setLinkState } = props
  const [form, setForm] = useState({ label: '', url: '' })

  const editor = useSlate()

  const updateField = (field, val) => {
    setForm({ ...form, [field]: val })
  }

  const handleLinkOk = useCallback(() => {
    if (form.url) {
      wrapLink(editor, linkState.selection, form.url, form.label)
    }
    setLinkState((state) => ({ ...state, visible: false }))
  }, [editor, form.label, form.url, linkState.selection, setLinkState])

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.code === 'Enter') {
        e.preventDefault()
        handleLinkOk()
      }
    }
    if (linkState.visible) {
      window.addEventListener('keydown', handleEnterPress)
    }

    return () => {
      window.removeEventListener('keydown', handleEnterPress)
    }
  }, [handleLinkOk, linkState.visible])

  return (
    <Modal
      zIndex={1057}
      visible={linkState.visible}
      mask={false}
      footer={null}
      closable={false}
      onCancel={() => setLinkState({ visible: false })}
      destroyOnClose
    >
      <div>
        <div className={styles.row}>
          <div className={styles.label}>文本</div>
          <Input
            autoFocus
            onChange={(e) => updateField('label', e.target.value)}
            value={form.label}
          />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>链接</div>
          <Input
            onChange={(e) => updateField('url', e.target.value)}
            value={form.url}
          />
        </div>
        <div>
          <Button type="primary" onClick={handleLinkOk}>
            确定
          </Button>
        </div>
      </div>
    </Modal>
  )
}
