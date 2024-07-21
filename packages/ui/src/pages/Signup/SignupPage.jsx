import React from 'react'
import { Images } from '../../../../../apps/client/assets'
import Image from 'next/image'
import { Typography, Button } from '../../atoms'
import { logo } from '../../../assets/'
import { SignUp } from '../../organisms'
import { useRouter } from 'next/router'
import Link from 'next/link'

const SignUpPage = () => {
  const router = useRouter()

  return (
    <div className="flex justify-center desktop:justify-start items-center h-screen overflow-hidden">
      <div className="w-1/2 hidden desktop:block">
        <Image
          src={Images.AuthenticationImage}
          alt="Login Image"
          width="500"
          height="500"
          className="hidden desktop:block object-cover rounded-tr-3xl rounded-br-3xl w-11/12 aspect-square"
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-1/2 h-full">
        <div className="w-screen desktop:w-[500px] flex justify-center desktop:justify-start gap-4 items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width="50"
              height="50"
              onClick={() => router.push('/')}
            />
          </Link>
          <Typography color="text-gray-500">
            Welcome, My Dear New User !
          </Typography>
        </div>
        <SignUp />
        <Button
          className="py-[15px] w-[250px] rounded-lg active:scale-110 bg-gray-200 bg-opacity-20 border-[1px] border-gray-500 text-gray-500"
          onClick={() => router.push('/')}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}

export default SignUpPage
