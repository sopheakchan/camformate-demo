import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '../../atoms'
import Link from 'next/link'

const Card = ({ icon, title, subTitle, amount = 0, link = 'all' }) => {
  return (
    <Link
      className="flex flex-col justify-evenly p-2 w-[270px] h-[250px] bg-primary-200 rounded-[10px] border-2 border-transparent hover:border-primary"
      href={`/${link}`}
    >
      <div className="h-2/4 flex justify-center items-center">{icon}</div>
      <Typography
        className="pl-4 select-none"
        fontWeight="font-bold"
        size="sm"
        color="text-black"
      >
        {title}
      </Typography>
      <Typography
        className="px-4 select-none"
        size="sm"
        fontWeight="font-normal"
        color="text-gray-500"
      >
        {amount} {subTitle}
      </Typography>
    </Link>
  )
}

Card.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  amount: PropTypes.number,
}

export default Card
