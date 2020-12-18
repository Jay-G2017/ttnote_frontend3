import React, { useState } from 'react'
import { Modal, Input, Button } from 'antd'
import styles from './styles.less'

function useLinkModal(onLinkOk) {
  const [form, setForm] = useState({ label: '', url: '' })
  const [linkModalVisible, setLinkModalVisible] = useState([false])

  const updateField = (field, val) => {
    setForm({ ...form, [field]: val })
  }

  const handleLinkOk = () => {
    if (form.url) {
      onLinkOk(linkModalVisible[1], form)
    }
    setLinkModalVisible([false])
  }

  const modal = (
    <Modal
      zIndex={1057}
      visible={linkModalVisible[0]}
      mask={false}
      footer={null}
      closable={false}
      onCancel={() => setLinkModalVisible(false)}
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

  return [modal, setLinkModalVisible]
}

export default useLinkModal
