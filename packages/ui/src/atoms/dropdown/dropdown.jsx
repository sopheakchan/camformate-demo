import React from 'react'
import { Select } from 'antd'
const { Option } = Select
import PropTypes from 'prop-types'

//accept props as [{}] (array objects) with property lable and key
function Dropdown({ items, placeholder, setValue, className = 'w-40' }) {
  return (
    <Select
      className={`${className} border-2 border-black rounded-md`}
      placeholder={placeholder}
      bordered={false}
      onChange={value => setValue(value)}
    >
      {items.map(item => {
        return (
          <Option value={item.label} key={item.key}>
            {item.label}
          </Option>
        )
      })}
    </Select>
  )
}

Dropdown.proptypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  className: PropTypes.string,
  setValue: PropTypes.func,
}

export default Dropdown
