import React from 'react';
import { Modal, Form, Input } from 'antd';
import styles from './styles.less';

const LinkModal = (props) => {
  const { visible } = props;

  return (
    <Modal
      zIndex={1057}
      visible={visible}
      mask={false}
      footer={null}
      closable={false}
      onCancel={props.onCancel}
    >
      <div>
        <div className={styles.row}>
          <div className={styles.label}>文本</div>
          <Input defaultValue="hi" />
        </div>
        <div className={styles.row}>
          <div className={styles.label}>链接</div>
          <Input defaultValue="hi" />
        </div>
      </div>
    </Modal>
  );
};

export default LinkModal;
