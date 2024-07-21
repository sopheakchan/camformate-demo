import React from 'react'
import PropTypes from 'prop-types'

const FormLabel = ({ title = 'title', subTitle }) => {
  return (
    <div className="flex flex-col text-start items-start gap-2">
      <div className="text-black text-md">{title}</div>
      <div className="text-xs text-gray-500">{subTitle}</div>
    </div>
  )
}

FormLabel.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
}

export default FormLabel
