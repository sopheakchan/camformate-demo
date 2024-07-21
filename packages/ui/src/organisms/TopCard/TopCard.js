import React from 'react'
import CV from '../../../assets/images/cv.png'
import companyImg from '../../../assets/images/companyImg.png'
import jobImg from '../../../assets/images/jobImg.png'
import Image from 'next/image'
import Link from 'next/link'
import { HiDocumentText } from 'react-icons/hi'
import { FaIndustry, FaBlackTie } from 'react-icons/fa'

const TopCard = () => {
  return (
    <div className="flex gap-3 mt-3">
      <Link
        href="#"
        className="w-[110px] h-[220px] tablet:w-[200px] tablet:h-[300px] flex items-start"
      >
        <div className="w-full h-[190px] tablet:h-[250px] shadow-sm px-2 border-primary">
          <div className="bg-blue-100 inline-block p-2 rounded-full">
            <HiDocumentText size={25} style={{ color: 'blue' }} />
          </div>
          <Image src={CV} alt="CV" />
          <p className="text-blue font-semibold flex justify-center items-center ">
            CV Samples
          </p>
        </div>
      </Link>
      <Link
        href="#"
        className="w-[110px] h-[220px] tablet:w-[200px] tablet:h-[300px] flex items-end"
      >
        <div className="w-full h-[190px] tablet:h-[250px] shadow-sm px-2 border-primary">
          <div className="bg-primary-200 mb-2 inline-block p-2 rounded-full">
            <FaIndustry size={25} style={{ color: 'orange' }} />
          </div>
          <Image src={companyImg} alt="company" />
          <p className="text-primary font-semibold flex justify-center items-center ">
            Top Companies
          </p>
        </div>
      </Link>
      <Link
        href="#"
        className="w-[110px] h-[220px] tablet:w-[200px] tablet:h-[300px] flex items-start"
      >
        <div className="w-full h-[190px] tablet:h-[250px] shadow-sm px-2 border-primary">
          <div className="bg-danger-100 mb-2 inline-block p-2 rounded-full">
            <FaBlackTie size={25} style={{ color: 'red' }} />
          </div>
          <Image src={jobImg} alt="job" />
          <p className="text-danger font-semibold flex justify-center items-center ">
            Top Jobs
          </p>
        </div>
      </Link>
    </div>
  )
}

export default TopCard
