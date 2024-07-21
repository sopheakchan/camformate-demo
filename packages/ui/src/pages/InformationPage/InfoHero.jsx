import React from 'react'
import { Typography } from '../../atoms'
import Image from 'next/image'
import { Images } from '../../../../../apps/client/assets'

const InfoHero = () => {
  return (
    <div className="max-w-[1296px]  desktop:h-[calc(100vh_-_60px)] w-full mx-auto   desktop:px-20 tablet:px-20 ">
      <div>
        <div className="tablet:flex tablet:justify-center hidden ">
          <div className="tablet:flex tablet:flex-col tablet:justify-center tablet:items-center ">
            <Typography className="tablet:text-lg tablet:fontWeight-normal tablet:text-primary desktop:text-xl desktop:text-primary desktop:fontWeight-normal tablet:block hidden ">
              University, Colleges School Education
            </Typography>
            <Typography className="tablet:text-lg tablet:text-primary tablet:fontWeight-normal desktop:text-xl desktop:text-primary desktop:fontWeight-normal tablet:block hidden">
              And Want Your Future Bright
            </Typography>
          </div>
          <div className="tablet:my-5 desktop:my-5">
            <Image
              src={Images.QuestionImage}
              alt="question"
              width={120}
              height={120}
              className=" hidden desktop:block tablet:block "
            />
          </div>
        </div>

        <div className="tablet:text-center">
          <Typography className="tablet:text-md tablet:text-gray-500 tablet:block hidden ">
            Find The Perfect Courses And Educational Gaol With Our Website
          </Typography>
        </div>
        <div className="hidden tablet:w-full tablet:h-3 tablet:bg-danger-400 tablet:mt-10 tablet:block "></div>

        <Image
          src={Images.Students}
          width={1367}
          alt="students"
          height={200}
          className=" desktop:w-[100%] desktop:h-[400px] hidden tablet:shadow-lg tablet:shadow-indigo-500/50 tablet:drop-shadow-lg tablet:block desktop:block "
        />
        <div className="relative w-full">
          <Image
            src={Images.StuMobile}
            width={768}
            alt="student"
            height={100}
            className="block brightness-50 tablet:hidden"
          />
          <div className="absolute bottom-[170px]">
            <Typography className="text-xl fontWeight-bold text- font-serif  text-white px-7 tablet:hidden">
              Welcome to Best Learning Institutions in Cambodia
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoHero
