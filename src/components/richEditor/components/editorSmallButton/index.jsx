import React from 'react'
import styles from './styles.less'
import classnames from 'classnames'
import { renderIcon } from '../editorButton'

const EditorSmallButton = (props) => {
  const { type, active, className, dataClipboardText, ...rest } = props

  return (
    <div
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
