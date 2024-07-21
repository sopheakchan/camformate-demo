import { Typography, Button } from '../../atoms'

import React from 'react'
import { SVGIcons } from '../../../../../apps/client/assets'

// SVGIcons.DollarIcon()
export const JobContentCard = ({
  title,
  subTitle,
  deadline,
  salary,
  schedule,
  location,
  description,
}) => {
  return (
    <div className=" w-[53rem] h-[19rem] rounded-[0.5rem] bg-primary-200 px-8 py-5 flex  flex-col gap-3 ">
      <Typography size="md" fontWeight="semi-bold">
        {title}
      </Typography>
      <div className="flex justify-between items-center">
        <Typography size="lg">{subTitle}</Typography>
        <Typography size="sm" color="text-danger">
          Deadline: {deadline}
        </Typography>
      </div>

      <div className="flex gap-7">
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
      <div className="h-28 ">
        <Typography size="sm">{description}</Typography>
      </div>
      <Button
        className="w-[9.4rem] h-[2.8rem] rounded-[0.5rem]"
        color="text-primary"
      >
        <Typography size="sm">View Detail</Typography>
      </Button>
    </div>
  )
}
