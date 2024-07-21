import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Shape, Typography, Button } from '../../atoms'
import { HomeInfoCards } from '../../organisms'
import { information } from '../../../assets'
import { AiOutlineArrowRight } from 'react-icons/ai'

const Information = () => {
  const title = 'School Information'
  const subTitle = 'Receive your School or University here'
  const router = useRouter()

  return (
    <div className="w-full mb-20  flex flex-col gap-10">
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

      <div className="pl-8 pr-8 flex flex-col-reverse gap-10 desktop:gap-0 desktop:flex-row desktop:justify-between desktop:items-start">
        <div className="flex flex-col gap-10">
          <Image
            src={information}
            width="400"
            height="200"
            alt="Information Image"
            className="hidden desktop:flex rounded-lg shadow-sm drop-shadow-lg shadow-gray-500 object-cover"
          />

          <Typography
            size="lg"
            color="mobile:text-sm tablet:text-md desktop:text-lg text-gray-500 "
          >
            Not sure which school to check ? We got you
          </Typography>
          <div className="group">
            {/* explore button for desktop */}
            <Button
              size="md"
              icon={<AiOutlineArrowRight />}
              iconAppearance=" text-xl"
              reverse={true}
              className="hidden desktop:flex text-sm rounded-lg w-2/3 border-2 border-primary hover:w-full hover:bg-transparent hover:border-2 hover:border-black group-hover:text-black ease-linear duration-300"
              onClick={() => router.push('/info')}
            >
              Explore More
            </Button>

            {/* explore button for mobile & tablet */}
            <Button
              size="md"
              icon={<AiOutlineArrowRight />}
              iconAppearance=" text-lg"
              reverse={true}
              className="flex desktop:hidden text-sm rounded-lg mobile:w-2/3 tablet:w-1/3 border-2 border-primary hover:w-[80%] tablet:hover:w-[60%] hover:bg-transparent hover:border-2 hover:border-black group-hover:text-black ease-linear duration-300"
              onClick={() => router.push('/info')}
            >
              Explore More
            </Button>
          </div>
        </div>
        <div className="flex justify-center items-center desktop:justify-start desktop:items-start">
          <HomeInfoCards />
        </div>
      </div>
    </div>
  )
}

export default Information
