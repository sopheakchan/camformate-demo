import Image from 'next/image'
import { Typography, Button } from '../../atoms'
import React from 'react'
import { SVGIcons } from '../../../../../apps/client/assets'
import Link from 'next/link'
import avatar from '../../../assets/images/avatar.jpg'
import job from '../../../assets/images/job.jpg'

const JobCard = ({ allItems }) => {
  const {
    company,
    job_name,
    deadline,
    salary,
    schedule,
    location,
    description,
    id,
  } = allItems

  const dateObj = new Date(deadline)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="w-[290px] tablet:[320px] desktop:w-[370px] desktop:h-[400px] bg-white rounded-2xl shadow-lg p-2 flex flex-col justify-between gap-2 group relative">
      <div className="w-full h-[200px] relative overflow-hidden">
        <Image
          src={job}
          alt="Job"
          width={400}
          height={150}
          className="w-full h-full object-cover aspect-[3/2] rounded-2xl "
        />
        <Image
          src={avatar}
          alt="avatar"
          width={50}
          height={50}
          className="z-10 absolute bottom-[15px] left-[10px] rounded-full border-2 border-primary"
        />
        <div className="w-full h-[50px] bg-gray-200 font-semibold text-danger bg-opacity-70 absolute bottom-0 right-0  flex items-center  uppercase justify-center">
          Deadline: {formattedDate}
        </div>
      </div>
      <p className="uppercase text-sm font-semibold text-primary tracking-wide">
        {job_name}
      </p>
      <p className="text-gray font-semibold">{company}</p>
      <div className="flex flex-col items-start gap-1 justify-between  ">
        <div className=" flex justify-center items-center">
          <span>{SVGIcons.DollarIcon()}</span>
          <span>&nbsp;{salary}</span>
        </div>
        <div className=" flex justify-center items-center">
          <span>{SVGIcons.JobTitleIcon()}</span>
          <span>&nbsp;{schedule}</span>
        </div>
        <div className=" flex justify-center items-center">
          <span>{SVGIcons.LocationIcon()}</span>
          <span>&nbsp;{location}</span>
        </div>
      </div>
      <div className="absolute left-0 top-0 right-0 bottom-0 rounded-2xl hidden group-hover:flex bg-white flex-col justify-center items-center gap-4 bg-opacity-50 transition-all duration-200 ease-linear">
        <button className="bg-primary p-2 rounded-lg text-white flex gap-4 justify-center items-center">
          <span>{SVGIcons.ProfileIcon()}</span>
          <span>View Profile</span>
        </button>
        <Link
          href={`/job/${id}`}
          className="bg-primary p-2 rounded-lg text-white flex gap-4 justify-center items-center"
        >
          <span>{SVGIcons.EyeIcon()}</span>
          <span>View Detail</span>
        </Link>
      </div>
    </div>
  )
}

export default JobCard
