import PropTypes from 'prop-types'

//accept props as string size and color
const Typography = ({
  size = 'md',
  color,
  children,
  fontWeight,
  className,
}) => {
  const styleMode = () => {
    if (size === 'xs') {
      return `text-xs`
    } else if (size === 'sm') {
      return `text-sm`
    } else if (size === 'md') {
      return `text-md`
    } else if (size === 'lg') {
      return `text-lg`
    } else if (size === 'xl') {
      return `text-xl`
    } else if (size === 'xxl') {
      return `text-xxl`
    }
  }

  const fontWeightMode = () => {
    if (fontWeight === 'normal') {
      return 'font-normal'
    } else if (fontWeight === 'medium') {
      return 'font-medium'
    } else if (fontWeight === 'semi-bold') {
      return 'font-semibold'
    } else if (fontWeight === 'bold') {
      return 'font-bold'
    }
  }
  const fontStyle = 'font-Poppins'
  const style = `${styleMode()} ${color} ${fontStyle} ${fontWeightMode()} ${className}`
  return <p className={style}>{children}</p>
}

Typography.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']),
  color: PropTypes.string,
  fontWeight: PropTypes.oneOf(['normal', 'medium', 'semi-bold', 'bold']),
  className: PropTypes.string,
}

export default Typography
