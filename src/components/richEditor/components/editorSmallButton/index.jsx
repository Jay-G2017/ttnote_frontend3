import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';
import { renderIcon } from '../editorButton';

const EditorSmallButton = (props) => {
  const { type, active, ...rest } = props;

  return (
    <div
      className={classnames({
        [styles.editorButton]: true,
        [styles.editorButtonActive]: active,
      })}
      {...rest}
    >
      {renderIcon(type)}
    </div>
  );
};

export default EditorSmallButton;
