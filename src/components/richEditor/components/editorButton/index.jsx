import React, { useCallback } from 'react'
import styles from './styles.less'
import classnames from 'classnames'
import { isHeading } from '../../utils'

const EditorButton = React.forwardRef((props, ref) => {
  const { type, active, disabled, onClick, ...rest } = props

  const handleOnClick = useCallback(
    (e) => {
      if (disabled) return
      if (onClick) onClick(e)
    },
    [disabled, onClick]
  )

  return (
    <div
      ref={ref}
      className={classnames({
        [styles.editorButton]: true,
        [styles.editorButtonActive]: active,
        [styles.editorButtonDisabled]: disabled,
        [styles.headingButton]: isHeading(type),
      })}
      {...rest}
      onClick={handleOnClick}
    >
      {renderIcon(type)}
    </div>
  )
})
export const BUTTON_TYPE_MAP = {
  bold: '粗体',
  italic: '斜体',
  strikethrough: '删除线',
  underline: '下划线',
  code: '代码',
  link: '链接',
  unlink: '去除链接',
  edit: '编辑',
  copy: '复制',
  h1: '标题1',
  h2: '标题2',
  h3: '标题3',
  h4: '标题4',
  h5: '标题5',
  h6: '标题6',
}

export const renderIcon = (type) => {
  switch (type) {
    case 'bold':
      return <span className="lake-icon lake-icon-bold" />
    case 'italic':
      return <span className="lake-icon lake-icon-italic" />
    case 'strikethrough':
      return <span className="lake-icon lake-icon-strikethrough" />
    case 'underline':
      return <span className="lake-icon lake-icon-underline" />
    case 'code':
      return <span className="lake-icon lake-icon-code" />
    case 'link':
      return <span className="lake-icon lake-icon-link" />
    case 'unlink':
      return <span className="lake-icon lake-icon-unlink" />
    case 'edit':
      return <span className="lake-icon lake-icon-edit" />
    case 'copy':
      return <span className="lake-icon lake-icon-copy" />
    case 'p':
      return (
        <>
          <span className={styles.btnInnerText}>正文</span>
          <span className="iconArrow" />
        </>
      )
    default:
      if (isHeading(type)) {
        return (
          <>
            <span className={styles.btnInnerText}>{BUTTON_TYPE_MAP[type]}</span>
            <span className="iconArrow" />
          </>
        )
      } else {
        return null
      }
  }
}

export default EditorButton
