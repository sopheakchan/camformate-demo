import React from 'react'
import Image from 'next/image'
import { scholarshipDetailPage } from '../../../assets'
import { Typography, Button } from '../../atoms'
const DetailPageHeroSection = ({ info }) => {
  const leftIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  )

  // max-w-[1296px] mx-auto
  return (
    <div className="grid items-center justify-center tablet:grid-cols-1 desktop:grid-cols-[1fr_1fr] max-w-[1296px] h-[calc(100vh_-_60px)] mx-auto px-10 desktop:px-20">
      <div className="order-2 desktop:order-1 relative">
        <Image
          src={scholarshipDetailPage}
          width="500"
          height="371"
          alt="hero-section image"
          className="relative z-20"
        />
        <div className=" hidden bg-primary-300 tablet:block tablet:w-[500px] tablet:h-[371px] desktop:block desktop:w-[500px] desktop:h-[371px] absolute z-10 -top-10 right-10"></div>
      </div>
      <div className="flex flex-col justify-start items-center desktop:mb-[145px]">
        <div className="w-96 h-10 bg-primary flex justify-center items-center mb-6">
          <Typography
            color="text-white"
            className="text-sm tablet:text-md desktop:text-md"
          >
            {info?.data?.data.scholarship_name}
          </Typography>
        </div>
        <div className="pl-4 tablet:pl-0 desktop:pl-0">
          <Typography className="mb-4 desktop:mb-8 text-sm leading-5 tablet:text-md desktop:text-md">
            {info?.data?.data.description}
          </Typography>
          <Typography className="mb-4 desktop:mb-8 text-sm leading-5 tablet:text-md desktop:text-md">
            Location: {info?.data?.data.location} Working Time: 8:30 am to 5pm
          </Typography>
          <Typography className="text-sm leading-5 tablet:text-md desktop:text-md">
            Students can apply into {info?.data?.data.majors} in{' '}
            {info?.data?.data.colleges} with{' '}
            <span className="text-danger">
              {info?.data?.data.prize.amount}{' '}
              {info?.data?.data.prize.type == 'dollars' ? '%' : '%'}
            </span>
          </Typography>

          <button className="w-[300px] mx-auto flex justify-center items-center mt-6 bg-primary text-white px-4 py-2 border-2 border-primary rounded-md hover:bg-white hover:text-primary transition duration-150 ease-out hover:ease-in">
            <Typography className="text-sm tablet:text-md desktop:text-md">
              {info?.data?.data.scholarship_name}
            </Typography>
            <Typography className="text-sm tablet:text-md desktop:text-md">
              {leftIcon}
            </Typography>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DetailPageHeroSection
