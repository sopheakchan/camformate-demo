import React, { useState } from 'react'
import Typography from '../typography/Typography'

const MajorsComponent = ({
  faculty,
  icon,
  item,
  setData,
  index,
  curDataKey,
}) => {
  // const bg =
  return (
    <div className="w-[380px] ">
      <button
        onClick={() => setData(item)}
        className={`w-full cursor-pointer ${
          item.key === curDataKey ? 'bg-gray-200' : ''
        }  border-b-2 py-5  border-primary flex gap-3 transition-all hover:bg-gray-200 `}
      >
        <div>{icon}</div>
        <Typography size="sm" className="tracking-normal">
          {faculty}
        </Typography>
      </button>
    </div>
  )
}

export default MajorsComponent
