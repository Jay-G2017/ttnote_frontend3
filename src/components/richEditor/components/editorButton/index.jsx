import React, { useCallback } from 'react';
import styles from './styles.less';
import classnames from 'classnames';

const EditorButton = (props) => {
  const { type, active, disabled, onClick, ...rest } = props;

  const handleOnClick = useCallback((e) => {
    if (disabled) return
    if (onClick) onClick(e)
  }, [disabled, onClick])

  return (
    <div
      className={classnames({
        [styles.editorButton]: true,
        [styles.editorButtonActive]: active,
        [styles.editorButtonDisabled]: disabled,
      })}
      {...rest}
      onClick={handleOnClick}
    >
      {renderIcon(type)}
    </div>
  );
};

export const renderIcon = (type) => {
  switch (type) {
    case 'bold':
      return <span className="lake-icon lake-icon-bold" />;
    case 'italic':
      return <span className="lake-icon lake-icon-italic" />;
    case 'strikethrough':
      return <span className="lake-icon lake-icon-strikethrough" />;
    case 'underline':
      return <span className="lake-icon lake-icon-underline" />;
    case 'code':
      return <span className="lake-icon lake-icon-code" />;
    case 'link':
      return <span className="lake-icon lake-icon-link" />;
    case 'unlink':
      return <span className="lake-icon lake-icon-unlink" />;
    case 'edit':
      return <span className="lake-icon lake-icon-edit" />;
    case 'copy':
      return <span className="lake-icon lake-icon-copy" />;
    default:
      return null;
  }
};

export default EditorButton;
