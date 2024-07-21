import React, { useEffect, useState } from 'react'
import { Navbar, Footer } from 'ui'
import { useRouter } from 'next/router'
import { useScroll } from 'framer-motion'
import { SVGIcons } from '../assets'

const Layout = ({ children }) => {
  const [showTopBtn, setShowTopBtn] = useState(false)

  const router = useRouter()
  const showFooter =
    router.pathname === '/upload' ||
    router.pathname === '/profile' ||
    router.pathname === '/profile/jobs/[job_id]/edit' ||
    router.pathname === '/profile/scholarships/[scholarship_id]/edit'
      ? false
      : true

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) return setShowTopBtn(true)
      return setShowTopBtn(false)
    })
  }, [])

  return (
    <>
      <Navbar />
      <div
        className={`${
          showTopBtn ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } hidden desktop:flex justify-center items-center cursor-pointer transition-all ease-linear duration-200 fixed bottom-[100px] right-[50px] bg-primary-300 animate-bounce w-[50px] h-[50px] rounded-full`}
        onClick={scrollToTop}
      >
        {SVGIcons.ArrowTopIcon()}
      </div>
      <div className="pt-20 min-h-screen">{children}</div>
      {showFooter ? <Footer /> : ''}
    </>
  )
}

export default Layout
