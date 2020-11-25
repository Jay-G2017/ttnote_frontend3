import React from 'react';
import styles from './styles.less';
import classnames from 'classnames';

const EditorButton = (props) => {
  const { type, active, ...rest } = props;

  const renderIcon = () => {
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
      default:
        return null;
    }
  };

  return (
    <div
      className={classnames({
        [styles.editorButton]: true,
        [styles.editorButtonActive]: active,
      })}
      {...rest}
    >
      {renderIcon()}
    </div>
  );
};

export default EditorButton;
