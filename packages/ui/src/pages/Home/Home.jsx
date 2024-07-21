import React from 'react'
import HeroSection from './HeroSection'
import Scholarship from './Scholarship'
import Job from './Job'
import Information from './Information'

const Home = () => {
  return (
    <div className="overflow-x-hidden px-0 tablet:px-0 desktop:px-20 max-w-[1296px] mx-auto">
      <HeroSection />
      <Scholarship />
      <Job />
      <Information />
    </div>
  )
}

export default Home
