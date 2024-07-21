import React from 'react'
import { Filter } from '../../organisms'
import { Typography } from '../../atoms'
import { scholarshipPic } from '../../../assets'
import Image from 'next/image'
import { SVGIcons } from '../../../../../apps/client/assets'

const HeroSection = () => {
  const items = [
    {
      placeholder: 'Academic Year',
      name: 'academicYear',
      icon: SVGIcons.AcademicIcon(),
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

  return (
    // containers for all elements
    <div className="max-w-[1296px] desktop:mx-auto ">
      {/* homesection for scholarship */}
      <div className=" max-w-screen h-[calc(100vh_-_60px)] tablet:h-[calc(100vh_-_60px)] desktop:h-[calc(100vh_-_60px)] flex flex-col justify-center items-center ">
        {/* main section below navbar */}
        <div>
          {/* top section */}
          <div className="flex justify-center items-center px-10 tablet:px-20 desktop:px-20 gap-32 tablet:mt-20 desktop:mt-20">
            {/* left content section for tex*/}
            <div>
              <Typography
                className="text-[1.5rem] tablet:w-[32.81rem] tablet:text-xxl desktop:text-xxl desktop:w-[32.81rem] leading-snug "
                color="text-primary"
              >
                Obtains the Best Award Scholarship That Is Most Appropriate for
                You
              </Typography>
              <Typography
                className="text-[1rem] mt-5 tablet::w-[20rem] tablet:mt-8 tablet:text-sm desktop:w-[20rem] desktop:mt-8 desktop:text-sm leading-7"
                color="text-gray-500"
              >
                They provide you the possibility to improve our community and
                the world..
              </Typography>
            </div>
            {/* right content section for image */}
            <div className="hidden  desktop:block">
              <Image
                src={scholarshipPic}
                width="692"
                height="306"
                alt="scholarship-picture"
              />
            </div>
          </div>
          {/* bottom section for filter  */}
          {/* <div className="px-10 flex justify-center items-center mt-16 mb-16 desktop:px-0">
            <Filter items={items} initialValues={initialValues} />
          </div> */}
        </div>
        {/* end of main section below navbar */}
      </div>
      {/* end of homesection of scholarship */}

      {/* selected school or something */}
      {/* <div>
        <Dropdown items={schoolTypes} placeholder="Public School" />
      </div> */}
    </div>
  )
}

export default HeroSection
