import React from 'react'
import PropTypes from 'prop-types'

const Shape = ({
  location,
  radius,
  width,
  height,
  color,
  children,
  className,
}) => {
  const setWidth = width => {
    if (width === 'sm') {
      return `w-28`
    } else if (width === 'full') {
      return ` w-full`
    } else if (width === 'md') {
      return `w-2/12`
    } else if (width === 'lg') {
      return `w-6/12`
    }
  }

  const setHeight = height => {
    if (height === 'sm') {
      return `h-1`
    } else if (height === 'md') {
      return `h-2`
    } else if (height === 'lg') {
      return `h-10`
    } else if (height === 'xl') {
      return `h-40`
    }
  }

  const setColor = color => {
    if (color === 'primary') {
      return `bg-primary`
    } else if (color === 'warning') {
      return `bg-warning`
    } else if (color === 'danger') {
      return `bg-danger`
    }
  }
  const setRadius = radius => {
    if (radius === 'md') {
      return `rounded-md`
    } else if (radius === 'rounded') {
      return `rounded`
    } else if (radius === 'lg') {
      return `rounded-lg`
    } else if (radius === 'full') {
      return `rounded-full`
    }
  }

  if (location === 'bottom') {
    return (
      <>
        <div> {children}</div>
        <div
          className={` ${setRadius(radius)} ${setWidth(width)} ${setHeight(
            height,
          )} ${setColor(color)} ${className}`}
        />
      </>
    )
  } else if (location === 'top') {
    return (
      <>
        <div
          className={` ${setRadius(radius)} ${setWidth(width)} ${setHeight(
            height,
          )} ${setColor(color)}`}
        />
        <div> {children}</div>
      </>
    )
  }
}

Shape.propTypes = {
  location: PropTypes.oneOf(['bottom', 'top']),
  height: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  width: PropTypes.oneOf(['sm', 'full', 'md', 'lg', 'xl']),
  color: PropTypes.oneOf(['warning', 'primary', 'danger']),
  radius: PropTypes.oneOf(['md', 'lg', 'full']),
}

export default Shape
