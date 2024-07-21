import React from 'react'
import Card from './Card'
import { useRouter } from 'next/router'

export const HomeInfoCards = () => {
  const router = useRouter()

  const navigator = link => {
    router.query.search = link
    router.pathname = '/info'
    router.push(router)
  }
  return (
    <>
      {/* for tablet & desktop */}
      <div className="hidden w-[500px] tablet:grid desktop:grid grid-cols-2 gap-x-8 gap-y-6   ">
        <Card onClick={() => navigator('/public_highschool')}>
          Public HighSchool
        </Card>
        <Card onClick={() => navigator('/private_highschool')}>
          Private HighSchool
        </Card>
        <Card onClick={() => navigator('/public_university')}>
          Public Universities
        </Card>
        <Card onClick={() => navigator('/private_university')}>
          Private Universities
        </Card>
      </div>

      {/* for mobile */}
      <div className="grid tablet:hidden desktop:hidden grid-cols-[repeat(4,270px)] gap-10 w-full overflow-hidden overflow-x-scroll p-4">
        <Card onClick={() => navigator('/public_highschool')}>
          Public HighSchool
        </Card>
        <Card onClick={() => navigator('/private_highschool')}>
          Private HighSchool
        </Card>
        <Card onClick={() => navigator('/public_university')}>
          Public Universities
        </Card>
        <Card onClick={() => navigator('/private_university')}>
          Private Universities
        </Card>
      </div>
    </>
  )
}
