import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'
import styles from './styles.less'

function useLinkModal(onLinkOk) {
  const [linkState, setLinkState] = useState({ visible: false })

  return [
    <LinkModal
      linkState={linkState}
      setLinkState={setLinkState}
      onLinkOk={onLinkOk}
    />,
    setLinkState,
  ]
}

export default useLinkModal

function LinkModal(props) {
  const { onLinkOk, linkState, setLinkState } = props
  const [form, setForm] = useState({ label: '', url: '' })

  const updateField = (field, val) => {
    setForm({ ...form, [field]: val })
  }

  const handleLinkOk = () => {
    if (form.url) {
      onLinkOk(linkState.selection, form)
    }
    setLinkState((state) => ({ ...state, visible: false }))
  }

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
