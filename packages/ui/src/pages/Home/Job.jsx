import React from 'react'
import { useRouter } from 'next/router'
import { Shape, Typography, Button } from '../../atoms'
import { HomeJobCard } from '../../organisms'
import { items } from './data/job'

const Job = () => {
  const title = 'Job Opportunities'
  const subTitle = 'Find your ideal jobs within below categories'
  const router = useRouter()

  return (
    <div className="w-screen tablet:w-full desktop:w-full mb-20 flex flex-col gap-10">
      <div className="tablet:pl-6">
        {/* title for desktop */}
        <Shape
          location="bottom"
          className="hidden tablet:hidden desktop:flex w-1/4"
          height="sm"
          color="primary"
          radius="md"
        >
          <Typography
            className="hidden tablet:hidden desktop:flex pl-4 pb-1"
            size="xl"
            color="text-gray"
          >
            {title}
          </Typography>
        </Shape>

        {/* title for tablets */}
        <Shape
          location="bottom"
          className="hidden tablet:flex desktop:hidden w-1/3"
          height="sm"
          color="primary"
          radius="md"
        >
          <Typography
            className="hidden tablet:flex desktop:hidden pl-4 pb-1"
            size="lg"
            color="text-gray"
          >
            {title}
          </Typography>
        </Shape>

        {/* title for mobile */}
        <Shape
          location="bottom"
          className="flex tablet:hidden desktop:hidden w-1/2 mx-4"
          height="sm"
          color="primary"
          radius="md"
        >
          <Typography
            className="flex tablet:hidden desktop:hidden pl-6 pb-1"
            size="md"
            color="text-gray"
          >
            {title}
          </Typography>
        </Shape>
      </div>

      {/* subtitle for desktop & tablet */}
      <Typography
        size="lg"
        color="text-gray-500 pl-8"
        className="hidden tablet:flex desktop:flex"
      >
        {subTitle}
      </Typography>
      {/* subtitle for mobile */}
      <Typography
        size="md"
        color="text-gray-500 pl-2"
        className="flex tablet:hidden desktop:hidden justify-center items-center"
      >
        {subTitle}
      </Typography>

      {/* category cards */}
      <div className="flex justify-center">
        <HomeJobCard items={items} />
      </div>

      {/* button for desktop & tablet */}
      <div className="tablet:w-full desktop:w-2/3 hidden tablet:flex desktop:flex flex-col gap-4 pl-8">
        <Typography
          size="lg"
          color="text-gray-500"
          className="tablet:text-md desktop:text-lg"
        >
          Click here to see more job recruitments with alot more feature
        </Typography>
        <Button
          size="lg"
          className="w-1/3 border-2 border-primary hover:bg-transparent hover:border-black hover:text-black ease-linear duration-300"
          onClick={() => router.push('/job')}
        >
          See all recruitments
        </Button>
      </div>

      {/* button for mobile */}
      <div className="w-full flex tablet:hidden desktop:hidden flex-col gap-10 pl-6">
        <Typography size="sm" color="text-gray-500">
          Click here to see more job recruitments
        </Typography>
        <Button
          size="md"
          className="w-[60%] border-2 rounded-lg py-[12px] border-primary hover:bg-transparent hover:border-black hover:text-black ease-linear duration-300"
          onClick={() => router.push('/job')}
        >
          See all recruitments
        </Button>
      </div>
    </div>
  )
}

export default Job
