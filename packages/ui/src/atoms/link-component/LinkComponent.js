import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LinkComponent = ({ href, children, className, onClick }) => {
  const router = useRouter()
  let style = ''
  if (
    router.pathname === href ||
    (router.pathname.includes(`/${href.split('/')[1]}/`) &&
      !router.pathname.includes('/profile/scholarships'))
  ) {
    style =
      'text-primary border-b-2 border-primary ease-linear duration-200 fill-primary'
  }
  return (
    <Link
      onClick={onClick}
      href={href}
      className={`${style} ${className} hover:text-primary hover:fill-primary ease-linear duration-200`}
    >
      {children}
    </Link>
  )
}

export default LinkComponent
