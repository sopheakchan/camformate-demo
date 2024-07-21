import React from 'react'
import { Typography } from '../../atoms'
import Image from 'next/image'
import { logo, logoV2 } from '../../../assets'

export const Footer = () => {
  return (
    <div className="shadow-sm drop-shadow-sm py-2 shadow-gray-500">
      <div className=" w-full h-[70px] tablet:h-[50px] desktop:h-[50px] flex flex-col gap-2 tablet:gap-0 tablet:flex-row desktop:gap-0 desktop:flex-row justify-between items-center max-w-[1296px] mx-auto px-20">
        <div className="flex gap-5 justify-center items-center">
          <Image
            src={logoV2}
            width={100}
            height={100}
            alt="Logo Image"
            className="w-[100px] desktop:w-[150px]"
          />
        </div>
        <div>
          <Typography
            color="text-black"
            fontWeight="normal"
            size="xs"
            className="text-[10px] desktop:text-[15px]"
          >
            &copy; 2022 Camformant. All rights reserved
          </Typography>
        </div>
      </div>
    </div>
  )
}
