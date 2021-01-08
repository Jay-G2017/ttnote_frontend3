import React from 'react'
import styles from './styles.less'
import classnames from 'classnames'

const PopMenuItem = (props) => {
  const { type, onClick, active } = props
  const headingNum = type[1]
  return (
    <div
      className={styles.menuItem}
      onMouseDown={(e) => {
        e.preventDefault()
        onClick()
      }}
    >
      <span
        className={classnames({
          [styles.iconCheckSmall]: active,
        })}
      />
      {type === 'p' ? (
        <span>正文</span>
      ) : (
        React.createElement('h' + headingNum, null, `标题${headingNum}`)
      )}
    </div>
  )
}

export default PopMenuItem
