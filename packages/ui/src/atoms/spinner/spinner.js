import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

const Spinner = () => {
  return (
    <Spin
      tip="Loading"
      size="large"
      className="rounded-lg bg-primary bg-opacity-20 py-4 px-6 w-[70px] h-[70px] font-semibold text-primary flex flex-col gap-2 justify-center items-center"
      indicator={<LoadingOutlined />}
    ></Spin>
  )
}

export default Spinner
