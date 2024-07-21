import React from 'react'
import ReactStars from 'react-stars'
const InfoSkeleton = () => {
  return (
    <div
      role="status"
      className="  w-[300px] h-[400px] leading-5 overflow-hidden shadow-lg drop-shadow-lg shadow animate-pulse md:p-6 rounded-lg"
    >
      <div className="flex items-center justify-center w-full h-[180px] mb-4 bg-gray-300 dark:bg-gray-500"></div>
      <div className="px-4">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-3 mt-8"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-2"></div>
        <div>
          <ReactStars count={4} size={24} color1={'#808080'} />
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-500 w-40 mb-5 mt-3"></div>
        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-500 mb-4 mt-4"></div>
        <div className="h-9  bg-gray-200 rounded-md w-24 dark:bg-gray-500 mb-4"></div>
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default InfoSkeleton
