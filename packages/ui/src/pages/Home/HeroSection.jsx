import React, { useState } from 'react'
import { Typography, Icon, Button } from '../../atoms'
import { heroSection, logo } from '../../../assets'
import Image from 'next/image'
import { FaUsers } from 'react-icons/fa'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'

const HeroSection = () => {
  const title = 'Impressive Decision To Be Kept Up To Date'
  const dailyUser = 1000
  const totalUser = '20k+'

  const handleGetStarted = offset => {
    window.scrollTo({
      top: window.outerHeight * offset,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      {/* hero section for desktop */}
      <div className="w-full pt-20 mb-20 hidden tablet:hidden desktop:flex flex-col">
        <div className="w-full h-11/12  flex ">
          <div className="flex flex-col w-2/3 h-full">
            <div className="flex w-full h-2/3 ">
              <Typography
                size="xl"
                color="text-primary"
                fontWeight="semi-bold"
                className="h-2/3 w-1/2 flex justify-start"
              >
                {title}
              </Typography>
              <div className="h-[100px] w-2/5 mt-24">
                <ul className="dynamic-txts">
                  <li>
                    <span>Scholarships</span>
                  </li>
                  <li>
                    <span>Job Opportunities</span>
                  </li>
                  <li>
                    <span>Information</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full h-1/3 pl-20 pt-5">
              <div className="bg-primary-300 w-52 h-52 rotate-45 flex justify-center items-center">
                <Typography color="text-white" className="-rotate-45">
                  News is in your hands
                </Typography>
              </div>
            </div>
          </div>
          <div className="w-1/3 h-full flex justify-end items-center relative mr-4">
            <Image
              src={heroSection}
              width="350"
              height="350"
              alt="hero-section image"
              className="relative z-20 object-cover"
            />
            <div className="bg-primary-300 desktop:w-[350px] desktop:h-[525px] absolute z-10 top-8 -right-8"></div>
          </div>
        </div>
        <div className="h-1/12 w-2/3 flex justify-start gap-8">
          <Typography
            color="text-gray"
            className="border-l-4 border-l-danger pl-4 flex items-center gap-4"
          >
            Daily Users
            <span>{dailyUser}</span>
            <Icon icon={<FaUsers />} size="xl" className="text-black" />
          </Typography>
          <Typography
            color="text-gray"
            className="border-l-4 border-l-green pl-4 flex items-center gap-4"
          >
            Total Users
            <span className="text-primary font-bold text-md">{totalUser}</span>
          </Typography>
        </div>
      </div>

      {/* hero section for mobile */}
      <div className="flex flex-col gap-2 tablet:flex tablet:flex-row tablet:items-center tablet:gap-0 desktop:hidden relative mt-5">
        <div className="flex justify-center items-center tablet:justify-start tablet:px-4">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <span className="text-md tablet:text-lg font-medium text-primary">
            Camformant will present to you with
          </span>
        </div>
        <div className="flex justify-center items-center tablet:justify-start tablet:items-start">
          <ul className="dynamic-txts">
            <li>
              <span>Scholarships</span>
            </li>
            <li>
              <span>Job Opportunities</span>
            </li>
            <li>
              <span>Information</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
