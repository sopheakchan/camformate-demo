import React from 'react'
import Icon from '../../atoms/icon/Icon'
import Typography from '../../atoms/typography/Typography'

const CardComponent = ({ icon, title, subTitle }) => {
  return (
    <div className="flex w-[300px] h-[108.68px] py-3 px-3 rounded-[10px] bg-primary-200 select-none border-2 border-transparent hover:border-2 hover:border-primary">
      <Icon icon={icon} />
      <div className="px-5 py-[10px] flex flex-col justify-evenly">
        <Typography color="text-gray-500" fontWeight="semi-bold">
          {title}
        </Typography>
        <Typography color="text-gray-500" size="sm" fontWeight="normal">
          {subTitle}
        </Typography>
      </div>
    </div>
  )
}

export default CardComponent
