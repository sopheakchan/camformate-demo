import React, { useState } from 'react'
import { Radio } from 'antd'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const CheckBox = ({ items, type, setValue, value }) => {
  const router = useRouter()
  // const [value, setsValue] = useState('All')

  // setValue(value)

  const onChange = e => {
    setValue(e.target.value)
    router.query[type] = e.target.value
    router.push(router, undefined, {
      shallow: true,
    })
  }

  return (
    <div>
      <h2 className="text-sm">{type}</h2>
      <Radio.Group
        onChange={onChange}
        value={value}
        className="block mb-6 mt-2"
        name="category"
      >
        {/* <Radio value="All" className="block text-md">
          All
        </Radio> */}
        {items.map(item => {
          return (
            <Radio
              value={item.label}
              key={item.key}
              className="block text-sm leading-5"
            >
              {item.label}
            </Radio>
          )
        })}
      </Radio.Group>
    </div>
  )
}

CheckBox.propTypes = {
  items: PropTypes.array,
  type: PropTypes.string,
  setValue: PropTypes.func,
}

export default CheckBox
