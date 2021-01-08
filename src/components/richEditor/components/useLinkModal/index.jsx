import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Modal, Input, Button } from 'antd'
import styles from './styles.less'
import { useSlate } from 'slate-react'
import { wrapLink } from '../../plugins/withLink'
import { useKeyPress } from 'ahooks'

function useLinkModal(setDSelection) {
  const [linkState, setLinkState] = useState({
    visible: false,
    selection: null,
    defaultLabel: '',
    defaultUrl: '',
    type: '', //edit 用于编辑
  })

  return [
    <LinkModal
      linkState={linkState}
      setDSelection={setDSelection}
      setLinkState={setLinkState}
    />,
    setLinkState,
  ]
}

export default useLinkModal

function LinkModal(props) {
  const { linkState, setLinkState, setDSelection } = props
  const { defaultLabel, defaultUrl, type, visible, selection } = linkState

  const editor = useSlate()

  const handleLinkOk = useCallback(
    (form) => {
      if (form.url) {
        wrapLink(editor, linkState.selection, {
          url: form.url,
          label: form.label,
          type,
        })
      }
      setLinkState((state) => ({ ...state, visible: false }))
    },
    [editor, linkState.selection, setLinkState, type]
  )

  // 处理dSelection
  useEffect(() => {
    if (visible && type !== 'edit' && setDSelection) {
      setDSelection(selection)
    }
    if (!visible && setDSelection) {
      setDSelection(null)
    }
  }, [selection, setDSelection, type, visible])

  return (
    <Modal
      zIndex={1057}
      visible={linkState.visible}
      mask={false}
      footer={null}
      closable={false}
      onCancel={() => {
        setLinkState((state) => ({ ...state, visible: false }))
        if (setDSelection) setDSelection(null)
      }}
      destroyOnClose
    >
      <LinkModalContent
        defaultLabel={defaultLabel}
        defaultUrl={defaultUrl}
        handleLinkOk={handleLinkOk}
      />
    </Modal>
  )
}

const LinkModalContent = (props) => {
  const { handleLinkOk, defaultLabel, defaultUrl } = props

  const [form, setForm] = useState({ label: '', url: '' })

  // 监听enter键
  useKeyPress(
    'enter',
    (e) => {
      e.preventDefault()
      handleLinkOk(form)
    },
    {
      target: document.getElementById('linkModalContent'),
    }
  )

  // 处理input自动focus
  const labelRef = useRef(null)
  const urlRef = useRef(null)

  // 处理默认值
  useEffect(() => {
    setForm({ label: defaultLabel, url: defaultUrl })

    // 处理input自动focus
    if (!defaultUrl && defaultLabel) {
      urlRef.current.focus()
    } else {
      labelRef.current.focus()
    }
  }, [defaultLabel, defaultUrl])

  return (
    <div id="linkModalContent">
      <div className={styles.row}>
        <div className={styles.label}>文本</div>
        <Input
          ref={labelRef}
          onChange={(e) => {
            const label = e.target.value
            setForm((state) => ({ ...state, label }))
          }}
          value={form.label}
        />
      </div>
      <div className={styles.row}>
        <div className={styles.label}>链接</div>
        <Input
          ref={urlRef}
          onChange={(e) => {
            const url = e.target.value
            setForm((state) => ({ ...state, url }))
          }}
          value={form.url}
        />
      </div>
      <div>
        <Button type="primary" onClick={() => handleLinkOk(form)}>
          确定
        </Button>
      </div>
    </div>
  )
}
