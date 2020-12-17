import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Input, Button } from 'antd';
import styles from './styles.less';

const LinkModal = (props) => {
  const { onOk } = props;
  const [form, setForm] = useState({ label: '', url: '' });

  const handleOnOk = useCallback(() => {
    if (onOk) {
      onOk(form);
    }
  }, [form, onOk]);

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.code === 'Enter') {
        console.log('e', e);
        e.preventDefault();
        handleOnOk();
      }
    };
    window.addEventListener('keydown', handleEnterPress);

    return () => {
      window.removeEventListener('keydown', handleEnterPress);
    };
  });

  const updateField = (field, val) => {
    setForm({ ...form, [field]: val });
  };

  return (
    <Modal
      zIndex={1057}
      visible={true}
      mask={false}
      footer={null}
      closable={false}
      onCancel={props.onCancel}
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
          <Button type="primary" onClick={handleOnOk}>
            确定
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LinkModal;
