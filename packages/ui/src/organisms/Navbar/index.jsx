import { Button, Typography, LinkComponent } from '../../atoms'
import { BsCloudUpload } from 'react-icons/bs'
import logo from '../../../assets/images/logo.png'
import { logoV2 } from '../../../assets'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { SVGIcons } from '../../../../../apps/client/assets/SVG'
import { GiHamburgerMenu } from 'react-icons/gi'
import { AiOutlineClose } from 'react-icons/ai'
import { useRef, useState } from 'react'
import Link from 'next/link'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { AiOutlineUser, AiOutlineLogout } from 'react-icons/ai'

export const Navbar = () => {
  const [nav, setNav] = useState(false)
  const sidebarRef = useRef(null)
  const { logout, user } = useAuth()
  const handleNav = () => {
    setNav(!nav)
  }
  const router = useRouter()

  const handleClickOutside = e => {
    if (!sidebarRef.current.contains(e.target)) setNav(false)
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen desktop:max-w-[1296px] mx-auto">
      {/* {for desktop} */}
      <div className="w-full flex fixed top-0 justify-between items-center px-4 desktop:gap-40 bg-white py-2 desktop:py-4 desktop:px-20 z-50 border-b-2 border-gray border-opacity-20">
        <Link href="/">
          <Image
            src={logoV2}
            width="200"
            height="200"
            className="w-[150px] active:scale-110"
            alt="Logo Image"
          />
        </Link>
        <div className="hidden desktop:flex justify-start items-center gap-12">
          <LinkComponent href="/" className="flex gap-2 items-end py-2">
            <div>{SVGIcons.HomeIcon()}</div>
            <div>
              <Typography size="sm">Home</Typography>
            </div>
          </LinkComponent>
          <LinkComponent
            href="/scholarships"
            className="flex gap-2 items-end py-2"
          >
            <div>{SVGIcons.ScholarshipIcon()}</div>
            <div>
              <Typography size="sm">Scholarships</Typography>
            </div>
          </LinkComponent>
          <LinkComponent href="/job" className="flex gap-2 items-end py-2">
            <div>{SVGIcons.JobOppIcon()}</div>
            <div>
              <Typography size="sm">Jobs</Typography>
            </div>
          </LinkComponent>
          <LinkComponent href="/info" className="flex gap-2 items-end py-2">
            <div>{SVGIcons.InfoIcon()}</div>
            <div>
              <Typography size="sm">Information</Typography>
            </div>
          </LinkComponent>
        </div>
        <div className="hidden tablet:flex tablet:flex-1 tablet:justify-end tablet:mr-8 desktop:justify-center desktop:flex-grow-0 items-center gap-4">
          <div className="group">
            <Button
              icon={<BsCloudUpload />}
              reverse={true}
              className="border-2 border-primary rounded-xl tablet:px-6 mobile:p-2 hover:text-black hover:bg-transparent hover:border-black ease-linear duration-100"
              iconAppearance="text-md group-hover:text-black ease-linear duration-100"
              onClick={() => router.push('/upload')}
            >
              Upload
            </Button>
          </div>
          <div className="group">
            {user ? (
              <div
                className="rounded-lg w-[50px] py-2 bg-primary text-lg flex justify-center items-center text-primary bg-opacity-40 cursor-pointer active:scale-110"
                onClick={() => router.push(`/profile`)}
              >
                <AiOutlineUser />
              </div>
            ) : (
              <Button
                disabled={!user} // Add this line to disable the button when user is not logged in
                icon={SVGIcons.LoginIcon()}
                variant="outlined"
                intent="secondary"
                iconAppearance="text-md text-black group-hover:text-white ease-linear duration-100"
                className="rounded-xl tablet:px-6 mobile:p-2 hover:bg-primary group-hover:text-white hover:border-primary hover:fill-white ease-linear duration-100"
                onClick={() => router.push('/login')}
              >
                Login
              </Button>
            )}
          </div>
        </div>
        <div onClick={handleNav} className="desktop:hidden">
          <GiHamburgerMenu size={30} className="text-gray-500" />
        </div>
      </div>

      {/* {for mobile phone} */}
      <div
        className={`desktop:hidden transition-all z-50 mb-4 fixed left-0 top-0 w-full h-screen bg-black ${
          nav ? 'bg-opacity-50' : 'bg-opacity-0 pointer-events-none'
        }`}
        onClick={handleClickOutside}
      >
        <div
          ref={sidebarRef}
          className={`w-[73%] max-w-[320px] h-screen bg-white px-10 py-3 left-0 transition-all top-0 ${
            nav ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div>
            <div className="flex justify-between items-center ">
              <Image src={logo} width="60" height="60" alt="Logo Image" />
              <div
                onClick={handleNav}
                className="rounded-full shadow-lg shadow-gray-400 p-3"
              >
                <AiOutlineClose size={25} className="text-gray-500" />
              </div>
            </div>
            {/* <div className="border-b border-gray-300 my-7">
              <p>Let's build somethings legendary together</p>
            </div> */}
          </div>

          <div className="py-8 flex flex-col gap-3">
            {user ? (
              <div className="flex tablet:hidden desktop:hidden gap-2 items-center">
                <div
                  className="rounded-lg w-[50px] py-2 bg-primary text-lg flex justify-center items-center text-primary bg-opacity-40 cursor-pointer active:scale-110"
                  onClick={() => router.push(`/profile`)}
                >
                  <AiOutlineUser />
                </div>
                <Typography size="sm" fontWeight="bold">
                  Your Profile
                </Typography>
              </div>
            ) : (
              ''
            )}
            <LinkComponent
              onClick={handleNav}
              href="/"
              className="flex gap-2 items-end py-2"
            >
              <div>{SVGIcons.HomeIcon()}</div>
              <div>
                <Typography size="sm">Home</Typography>
              </div>
            </LinkComponent>
            <LinkComponent
              onClick={handleNav}
              href="/scholarships"
              className="flex gap-2 items-end py-2"
            >
              <div>{SVGIcons.ScholarshipIcon()}</div>
              <div>
                <Typography size="sm">Scholarships</Typography>
              </div>
            </LinkComponent>
            <LinkComponent
              onClick={handleNav}
              href="/job"
              className="flex gap-2 items-end py-2"
            >
              <div>{SVGIcons.JobOppIcon()}</div>
              <div>
                <Typography size="sm">Jobs</Typography>
              </div>
            </LinkComponent>
            <LinkComponent
              onClick={handleNav}
              href="/info"
              className="flex gap-2 items-end py-2"
            >
              <div>{SVGIcons.InfoIcon()}</div>
              <div>
                <Typography size="sm">Information</Typography>
              </div>
            </LinkComponent>
          </div>
          <div className="mt-11 flex flex-col tablet:hidden">
            <p className="border-b">Get started with us</p>
            <div className="flex flex-col justify-start items-center gap-4 mt-7">
              <div className="group w-full flex">
                <Button
                  icon={<BsCloudUpload />}
                  reverse={true}
                  className="w-full border-2 border-primary rounded-xl tablet:px-6 mobile:p-2 hover:text-black hover:bg-transparent hover:border-black ease-linear duration-100"
                  iconAppearance="text-md group-hover:text-black ease-linear duration-100"
                  onClick={() => {
                    handleNav()
                    router.push('/upload')
                  }}
                >
                  Upload
                </Button>
              </div>
              <div className="group flex w-full">
                {user ? (
                  <Button
                    icon={<AiOutlineLogout />}
                    variant="outlined"
                    intent="secondary"
                    iconAppearance="text-md text-black group-hover:text-white ease-linear duration-100"
                    className="w-full rounded-xl tablet:px-6 mobile:p-2 hover:bg-primary group-hover:text-white hover:border-primary hover:fill-white ease-linear duration-100"
                    onClick={() => {
                      handleNav()
                      logout()
                    }}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    icon={SVGIcons.LoginIcon()}
                    variant="outlined"
                    intent="secondary"
                    iconAppearance="text-md text-black group-hover:text-white ease-linear duration-100"
                    className="w-full rounded-xl tablet:px-6 mobile:p-2 hover:bg-primary group-hover:text-white hover:border-primary hover:fill-white ease-linear duration-100"
                    onClick={() => router.push('/login')}
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
