import { Typography, Button } from '../../atoms'

import React from 'react'
import { SVGIcons } from '../../../../../apps/client/assets'
import Link from 'next/link'

// SVGIcons.DollarIcon()
export const JobContentCard = ({ allItems }) => {
  const {
    title,
    subTitle,
    deadline,
    salary,
    schedule,
    location,
    description,
    id,
  } = allItems
  return (
    <div>
      {/* for desktop */}
      <div className="hidden tablet:flex  tablet:w-[34rem] tablet:h-[20rem]  desktop:w-[50rem] desktop:h-[19rem] desktop:flex  rounded-[0.5rem] bg-white shadow-lg drop-shadow-lg px-8 py-5  flex-col desktop:gap-3 ">
        <Typography size="md" fontWeight="semi-bold">
          {title}
        </Typography>
        <div className="flex tablet:flex-col desktop:flex-row desktop:justify-between desktop:items-center">
          <Typography className="tablet:text-[18px] desktop:text-lg">
            {subTitle}
          </Typography>
          <Typography size="sm" color="text-danger tablet:mt-2">
            Deadline: {deadline}
          </Typography>
        </div>

        <div className="flex gap-7 tablet:py-2 desktop:py-0">
          <div className="flex items-center gap-2">
            <div className="scale-75">{SVGIcons.DollarIcon()}</div>
            <Typography size="sm" color="text-danger">
              {salary}
            </Typography>
            <Typography size="sm"> /month</Typography>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="scale-75">{SVGIcons.JobTitleIcon()}</div>
            <Typography size="sm">{schedule}</Typography>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="scale-75">{SVGIcons.LocationIcon()}</div>
            <Typography size="sm">{location}</Typography>
          </div>
        </div>
        <div className="h-28  ">
          <Typography size="sm" className="leading-6  ">
            {description}
          </Typography>
        </div>

        <Link
          href={`/job/${id}`}
          className="w-[100px] text-white rounded-[0.5rem] bg-primary flex justify-center items-center tablet:h-[2rem] tablet:mt-5 desktop:w-[200px] desktop:h-[50px] hover:border-black hover:bg-transparent hover:text-black border-2 border-primary ease-linear duration-200"
        >
          See more
        </Link>
      </div>

      {/* for mobile Phone */}
      <div className="tablet:hidden desktop:hidden w-[300px] h-[270px] px-5 py-5 bg-white shadow-sm">
        <div className="flex flex-col gap-3">
          <Typography size="sm" fontWeight="semi-bold">
            {title}
          </Typography>
          <Typography size="sm" className="tracking-normol leading-5">
            {subTitle}
          </Typography>
          <Typography size="sm" color="text-danger">
            Deadline: {deadline}
          </Typography>
        </div>
        <div className="flex flex-col ">
          <div className="flex items-center gap-2">
            <div className="scale-75">{SVGIcons.DollarIcon()}</div>
            <Typography size="sm" color="text-danger">
              {salary}
            </Typography>
            <Typography size="sm"> /month</Typography>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="scale-75">{SVGIcons.JobTitleIcon()}</div>
            <Typography size="sm">{schedule}</Typography>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="scale-75">{SVGIcons.LocationIcon()}</div>
            <Typography size="sm">{location}</Typography>
          </div>
        </div>

        <Link
          href={`/job/${id}`}
          className="w-[100%] text-white h-[2rem] mt-3 rounded-[0.7rem] bg-primary flex justify-center items-center"
        >
          See more
        </Link>
      </div>
    </div>
  )
}
