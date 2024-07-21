import React from 'react'
import Typography from '../typography/Typography'
import PropTypes from 'prop-types'

const MajorsComponent = ({
  faculty,
  icon,
  item,
  setData,
  index,
  curDataKey,
}) => {
  // const bg =

  console.log(item?.key)
  console.log(curDataKey)

  return (
    <div className=" tablet:w-[300px] desktop:w-[380px] pb-2">
      <button
        onClick={() => setData(item)}
        className={`w-max px-5 py-3 border-r-2 border-primary tablet:border-r-0 tablet:px-0 tablet:w-full desktop:border-r-0 desktop:w-full cursor-pointer ${
          item._id === curDataKey ? 'bg-gray-200' : ''
        }  tablet:border-b-2 desktop:border-b-2 tablet:py-5 desktop:py-5  tablet:border-primary desktop:border-primary flex gap-3 transition-all tablet:hover:bg-gray-200 desktop:hover:bg-gray-200 `}
      >
        <div className="hidden tablet:block desktop:block">{icon}</div>
        <Typography className=" text-[15px] tracking-wider leading-[17px] tablet:text-sm tablet:tracking-normal desktop:text-sm desktop:tracking-normal">
          {faculty}
        </Typography>
      </button>
    </div>
  )
}

MajorsComponent.propTypes = {
  faculty: PropTypes.string,
  icon: PropTypes.object,
  item: PropTypes.object,
  curDataKey: PropTypes.number,
  setData: PropTypes.func,
}

export default MajorsComponent
