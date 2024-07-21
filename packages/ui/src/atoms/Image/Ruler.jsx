import React from 'react'
import { PropTypes } from 'prop-types'

const Ruler = ({ width, height, color }) => {
  const setWidth = (width) => {
    if (width === 'auto') {
      return `w-auto`
    } else if (width === 'full') {
      return `w-full`
    } else if (width === '1/12') {
      return `w-1/12`
    } else if (width === '2/12') {
      return `w-2/12`
    } else if (width === '6/12') {
      return `w-6/12`
    }
  }
  const setHeight = (height) => {
    if (height === 'auto') {
      return `h-auto`
    } else if (height === 'full') {
      return `h-full`
    } else if (height === '5') {
      return `h-5`
    } else if (height === '1') {
      return `h-1`
    } else if (height === '2') {
      return `h-2`
    }
  }
  const setColor = (color) => {
    if (color === 'primary') {
      return `bg-primary`
    } else if (color === 'warnning') {
      return `bg-warning`
    } else if (color === 'danger') {
      return `bg-danger`
    }
  }

  return <div className={`${setWidth(width)} ${setHeight(height)} ${setColor(color)}`}/>
}
Ruler.prototype = {
  height: PropTypes.oneOf(['auto', 'full', '1/12', '2/12', '6/12']),
  width: PropTypes.oneOf(['auto', 'full', '5','2' , '1']),
  color: PropTypes.oneOf(['warning', 'primary', 'danger']),
}

export default Ruler
