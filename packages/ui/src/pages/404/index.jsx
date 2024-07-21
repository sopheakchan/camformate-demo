import React from 'react'
import { Images } from '../../../../../apps/client/assets'
import { Typography, Button } from '../../atoms'
import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6 h-screen text-center desktop:text-clip overflow-hidden relative">
      <div className="bg-primary absolute left-[50%] -ml-[175px] desktop:-ml-[250px] top-[50%] -mt-[175px] desktop:-mt-[250px] animate-ping rounded-full w-[350px] h-[350px] desktop:w-[500px] desktop:h-[500px] opacity-50"></div>
      <Typography size="xl" color="text-primary" fontWeight="bold">
        Opps ! Something is missing !
      </Typography>
      <Typography color="text-gray-500">
        The page you are looking for is not found &#9785;
      </Typography>
      <Image src={Images.NotFound404} alt="404" width="300" height="300" />
      <Button
        size="lg"
        className="border-2 border-transparent rounded-lg hover:bg-transparent hover:border-black hover:text-black ease-linear duration-200 z-50"
      >
        <Link href="/">Continue to home</Link>
      </Button>
    </div>
  )
}

export default NotFound
