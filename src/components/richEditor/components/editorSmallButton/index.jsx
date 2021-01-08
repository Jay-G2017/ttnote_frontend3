import React from 'react'
import styles from './styles.less'
import classnames from 'classnames'
import { renderIcon, BUTTON_TYPE_MAP } from '../editorButton'

const EditorSmallButton = (props) => {
  const { type, active, id, className, dataClipboardText, ...rest } = props

  return (
    <div
      title={BUTTON_TYPE_MAP[type]}
      id={id}
      data-clipboard-text={dataClipboardText}
      className={classnames({
        [styles.editorButton]: true,
        [styles.editorButtonActive]: active,
        [className]: true,
      })}
      {...rest}
    >
      {renderIcon(type)}
    </div>
  )
}

export default EditorSmallButton
