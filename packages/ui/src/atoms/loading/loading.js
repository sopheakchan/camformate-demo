import React from 'react'
import Image from 'next/image'
import { logo } from '../../../assets'

const Loading = () => {
  return (
    <div className="w-screen h-screen bg-gray-200 bg-opacity-50 absolute z-50 flex justify-center items-center flex-col">
      <div className="w-[200px] h-[200px] bg-primary bg-opacity-50 animate-ping rounded-full absolute z-40"></div>
      <Image
        src={logo}
        alt="Logo"
        width={100}
        height={100}
        className="z-50 animate-pulse"
      />
    </div>
  )
}

export default Loading
