import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '../../atoms'

export const DetailCard = ({ title, content = [], main }) => {
  if (main) {
    return (
      <div className="relative w-[90%]">
        <div className="w-full h-full bg-primary absolute -top-6 left-8 z-20"></div>
        <div className="w-full border-2 border-gray-500 p-8 flex flex-col gap-4 z-30 relative bg-white">
          <Typography color="text-black" className="text-md desktop:text-lg">
            {title}
          </Typography>
          <div className="flex flex-col gap-2">
            {content.map((item, index) => {
              return (
                <div key={index} className="flex gap-2">
                  <Typography color="text-gray-500 text-sm tablet:text-md desktop:text-md">
                    {index + 1}.
                  </Typography>
                  <Typography color="text-gray text-sm tablet:text-md desktop:text-md leading-5">
                    {item}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-[90%] border-2 border-gray-500 p-8 flex flex-col gap-4 rounded-lg">
      <Typography color="text-black" className="text-md desktop:text-lg">
        {title}
      </Typography>
      <div className="flex flex-col gap-2">
        {content.map((item, index) => {
          return (
            <div key={index} className="flex gap-2">
              <Typography color="text-gray-500 text-sm tablet:text-md desktop:text-md">
                {index + 1}.
              </Typography>
              <Typography color="text-gray text-sm tablet:text-md desktop:text-md leading-5">
                {item}
              </Typography>
            </div>
          )
        })}
      </div>
    </div>
  )
}

DetailCard.propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
  main: PropTypes.bool,
}
