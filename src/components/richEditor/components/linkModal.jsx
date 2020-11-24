import React from 'react'
import {Modal, Form, Input} from 'antd'

 const LinkModal = (props) => {
  const {visible} = props;
  return (
    <Modal
      zIndex={1057}
      visible={visible}
      mask={false}
    >
      <div>
        <div className='flexRow'>
          <div>he</div>
          <Input defaultValue={'hello'} />
        </div>
      </div>

    </Modal>
  )

}

export default LinkModal