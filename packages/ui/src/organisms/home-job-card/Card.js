import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '../../atoms'
import { useRouter } from 'next/router'

const Card = ({ icon, title, subTitle, amount = 0, link }) => {
  const router = useRouter()
  const navigator = link => {
    router.query.search = link
    router.pathname = '/job'
    console.log(router)
    router.push(router)
  }

  return (
    <div
      className="cursor-pointer flex flex-col justify-evenly p-2 w-[270px] h-[250px] bg-primary-200 rounded-[10px] border-2 border-transparent hover:border-primary"
      onClick={() => navigator(link)}
    >
      <div className="h-2/4 flex justify-center items-center">{icon}</div>
      <Typography
        className="pl-4 select-none"
        fontWeight="bold"
        size="sm"
        color="text-black"
      >
        {title}
      </Typography>
      <Typography
        className="px-4 select-none"
        size="sm"
        fontWeight="normal"
        color="text-gray-500"
      >
        {amount} {subTitle}
      </Typography>
    </div>
  )
}

Card.propTypes = {
  icon: PropTypes.object,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  amount: PropTypes.number,
}

export default Card
