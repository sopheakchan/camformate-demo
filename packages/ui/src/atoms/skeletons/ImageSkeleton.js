import React from 'react'
import { Skeleton } from 'antd'
import PropTypes from 'prop-types'

const ImageSkeleton = ({ active, loading = false }) => {
  return (
    <Skeleton.Image
      active={active}
      loading={loading}
      style={{
        borderRadius: '100%',
        width: '95px',
        height: '95px',
        backgroundColor: 'white',
      }}
    />
  )
}

ImageSkeleton.propTypes = {
  active: PropTypes.bool,
  loading: PropTypes.bool,
}

export default ImageSkeleton
