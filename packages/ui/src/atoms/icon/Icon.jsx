import React from 'react'
import { PropTypes } from 'prop-types'

const Icon = ({ icon, size = 'xs', color = 'primary', onClick, className }) => {
  const IconSize = () => {
    if (size === 'xs') {
      return `text-xs`
    } else if (size === 'sm') {
      return `text-sm`
    } else if (size === 'lg') {
      return `text-lg`
    } else if (size === 'md') {
      return `text-md`
    } else if (size === 'xl') {
      return `text-xl`
    } else if (size === 'xxl') {
      return `text-xxl`
    }
  }

  const SetColor = () => {
    if (color === 'primary') {
      return `text-primary`
    } else if (color === 'danger') {
      return `text-danger`
    } else if (color === 'warnning') {
      return `text-warnning`
    } else if (color === 'gray') {
      return 'text-gray'
    }
  }
  return (
    <>
      <span
        className={`${IconSize()} ${SetColor()} ${className}`}
        onClick={onClick}
      >
        {icon}
      </span>
    </>
  )
}

Icon.propTypes = {
  Icon: PropTypes.object,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  color: PropTypes.oneOf(['primary', 'danger', 'warning']),
  onClick: PropTypes.func,
  className: PropTypes.string,
}
export default Icon
