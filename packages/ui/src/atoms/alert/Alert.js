import React from 'react'
import { Alert } from 'antd'
import PropTypes from 'prop-types'

const CustomAlert = ({ message, show, setShow, type, closable, onClose }) => {
  return (
    <div className="fixed top-0 right-0 z-50 w-full">
      <Alert
        message={message}
        type={type}
        className={`${
          show ? 'scale-100' : 'scale-0'
        } absolute top-[150px] right-[20px]`}
        closable={closable}
        onClose={onClose}
      />
    </div>
  )
}

CustomAlert.propTypes = {
  message: PropTypes.string,
  show: PropTypes.bool,
  setShow: PropTypes.func,
  type: PropTypes.string,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
}

export default CustomAlert
