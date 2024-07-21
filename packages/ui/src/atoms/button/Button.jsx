import React from 'react'
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const Button = ({
  children = 'Button',
  variant = 'contained',
  size = 'md',
  intent = 'primary',
  className,
  icon,
  iconAppearance = 'text-white',
  onClick,
  type = 'button',
  isSpinning = false,
  ...rest
}) => {
  //to check size mode
  const sizeMode = size => {
    if (size === 'xl') {
      return 'px-16 py-4 text-md rounded-md'
    } else if (size === 'lg') {
      return 'px-8 py-2 text-md rounded-md'
    } else if (size === 'md') {
      return 'px-6 py-2 text-sm rounded-sm'
    } else {
      return 'px-4 py-2 text-xs rounded-xs'
    }
  }

  //to check variant mode
  const variantIntentMode = (variant, intent) => {
    if (variant === 'contained') {
      if (intent === 'primary') {
        return 'bg-primary text-white'
      } else if (intent === 'secondary') {
        return 'bg-black text-white'
      } else {
        return 'bg-danger text-white'
      }
    } else {
      if (intent === 'primary') {
        return 'bg-transparent border-primary border-2'
      } else if (intent === 'secondary') {
        return 'bg-transparent border-black border-2'
      } else {
        return 'bg-transparent border-danger border-2'
      }
    }
  }

  //check if icon is passed
  const iconMode = icon ? 'flex gap-4 justify-center items-center' : ''

  //to reverse if icon is passed
  const childrenContent = () => {
    if (rest.reverse) {
      return (
        <>
          {children} <span className={`${iconAppearance}`}>{icon}</span>
        </>
      )
    }
    return (
      <>
        <span className={`${iconAppearance}`}>{icon}</span> {children}
      </>
    )
  }

  const spinIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: rest.spinColor,
      }}
      spin
    />
  )

  return (
    <button
      type={type}
      className={`select-none ${className} ${sizeMode(
        size,
      )} ${variantIntentMode(variant, intent)}
      ${iconMode}
      `}
      onClick={onClick}
    >
      {childrenContent()}
      <Spin
        indicator={spinIcon}
        spinning={isSpinning}
        className={`${isSpinning ? 'flex' : 'hidden'}`}
      />
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  intent: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  variant: PropTypes.oneOf(['contained', 'outlined']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  icon: PropTypes.object,
  iconAppearance: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
}

export default Button
