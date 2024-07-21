import React from 'react'
import Image from 'next/image'
import { Filter, Navbar } from '../../organisms'
import { jobPage } from '../../../assets'
import { Dropdown, Typography } from '../../atoms'
import { SVGIcons } from '../../../../../apps/client/assets'

const JobHeroSection = () => {
  const items = [
    {
      placeholder: 'Job Title',
      name: 'jobTitle',
      icon: SVGIcons.JobTitleIcon(),
    },
    {
      placeholder: 'Location',
      name: 'location',
      icon: SVGIcons.LocationIcon(),
    },
    {
      placeholder: 'Salary Range',
      name: 'salaryRange',
      icon: SVGIcons.DollarIcon(),
    },
    {
      placeholder: 'Industry',
      name: 'industry',
      icon: SVGIcons.IndustryIcon(),
    },
  ]

  let initialValues = {}

  items.forEach(val => {
    initialValues[val.name] = ''
  })

  //   const
  return (
    <>
      <div className="flex flex-col desktop:h-screen overflow-x-hidden max-w-[1296px] mx-auto  desktop:px-10">
        <div className=" desktop:h-[calc(100vh_-_80px)] desktop:mt-0  flex flex-col items-center justify-center w-full">
          <div className="flex flex-col tablet:px-9 tablet:grid tablet:grid-cols-[2fr_3fr] tablet:gap-7 desktop:grid desktop:grid-cols-[2fr_3fr] desktop:gap-5 place-content-center w-full h-full ">
            <div className="mobile:w-[110%]  desktop:w-[100%]">
              <Image
                src={jobPage}
                width="600"
                height="562"
                alt="Job Image"
                className="w-full"
              />
            </div>
            <div className="hidden  tablet:items-center tablet:flex tablet:mt-8  tablet:gap-8 desktop:flex desktop:mt-16 desktop:gap-8 desktop:items-start  ml-6 flex-col  ">
              <Typography
                color="text-primary"
                fontWeight="medium"
                className="w-[70%] justify-start desktop:w-auto desktop:text-xxl desktop:static desktop:font-normal   z-20"
              >
                One Step Closer To Your Dream Jobs
              </Typography>
              <Typography
                size="md"
                className=" w-[70%]  text-gray-500 desktop:m-0 desktop:w-4/5  desktop:leading-8 desktop:text-md leading-6 text-sm"
              >
                Come and find out your most favorite job with us . All the
                information you need for your future career are here . Goodluck
                on seeking your dreams
              </Typography>
            </div>
          </div>

          <div className="px-10 mt-2 w-full mb-2 tablet:mt-10 tablet:w-full  flex justify-center items-center desktop:mt-0 desktop:px-0">
            <Filter
              items={items}
              initialValues={initialValues}
              className="w-full mb-16"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobHeroSection
