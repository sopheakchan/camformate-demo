import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Shape, Typography, Button } from '../../atoms'
import { HomeScholarshipCard } from '../../organisms'
import { scholarshipImg } from '../../../assets'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Scholarship = () => {
  const title = 'Scholarships'
  const subTitle = 'Find your preferred scholarships here'
  const router = useRouter()

  return (
    <div className="h-full w-full mb-20 desktop:mb-32 mobile:pt-10 tablet:pt-10 flex flex-col gap-10">
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

      <div className="pl-0 desktop:pl-8 flex flex-col desktop:flex-row justify-between gap-10">
        <div className="flex justify-center items-center desktop:justify-start desktop:items-start">
          <HomeScholarshipCard />
        </div>
        <div className="flex flex-col gap-10">
          <div className="w-[90%] desktop:w-[400px] pl-6 desktop:pl-0 overflow-hidden rounded-lg">
            <Image
              src={scholarshipImg}
              width="400"
              height="200"
              alt="Scholarship Image"
              className="hidden desktop:block w-[400px] rounded-lg shadow-sm drop-shadow-lg shadow-gray-500 object-cover aspect-[3/2] hover:scale-110 ease-linear duration-200"
            />
            <Typography
              size="lg"
              color="text-gray-500"
              className="mobile:text-sm tablet:text-md desktop:hidden"
            >
              Click here to see more job recruitments with alot more feature
            </Typography>
          </div>
          <div className="group pl-6 desktop:pl-0">
            {/* explore button for desktop */}
            <Button
              size="md"
              icon={<AiOutlineArrowRight />}
              iconAppearance=" text-xl"
              reverse={true}
              className="hidden desktop:flex text-sm rounded-lg w-2/3 border-2 border-primary hover:w-full hover:bg-transparent hover:border-2 hover:border-black group-hover:text-black ease-linear duration-300"
              onClick={() => router.push('/scholarship')}
            >
              Explore More
            </Button>

            {/* explore button for mobile & tablet */}
            <Button
              size="md"
              icon={<AiOutlineArrowRight />}
              iconAppearance=" text-lg"
              reverse={true}
              className="flex desktop:hidden text-sm rounded-lg mobile:w-[60%] tablet:w-1/3 border-2 border-primary hover:w-[80%] tablet:hover:w-[60%] hover:bg-transparent hover:border-2 hover:border-black group-hover:text-black ease-linear duration-300"
              onClick={() => router.push('/scholarship')}
            >
              Explore More
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scholarship
