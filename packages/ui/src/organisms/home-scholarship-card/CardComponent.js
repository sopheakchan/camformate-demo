import React from 'react'
import Icon from '../../atoms/icon/Icon'
import Typography from '../../atoms/typography/Typography'
import PropTypes from 'prop-types'

const CardComponent = ({ icon, title, subTitle, onClick }) => {
  return (
    <>
      {/* for tablet & desktop */}
      <div
        className="hidden tablet:flex desktop:flex w-[300px] h-[108.68px] py-3 px-3 rounded-[10px] bg-primary-200 select-none border-2 border-transparent hover:border-2 hover:border-primary"
        onClick={onClick}
      >
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

      {/* for mobile */}
      <div
        className="flex flex-col justify-evenly tablet:hidden desktop:hidden items-center w-[270px] h-[250px] py-3 px-3 text-center rounded-[10px] bg-primary-200 select-none border-2 border-transparent hover:border-2 hover:border-primary"
        onClick={onClick}
      >
        <Icon icon={icon} />
        <div className="px-5 py-[10px] flex flex-col gap-4">
          <Typography color="text-gray-500" fontWeight="semi-bold">
            {title}
          </Typography>
          <Typography color="text-gray-500" size="sm" fontWeight="normal">
            {subTitle}
          </Typography>
        </div>
      </div>
    </>
  )
}

CardComponent.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  onClick: PropTypes.func,
}

export default CardComponent
