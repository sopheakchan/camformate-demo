import React from 'react'
import { Typography, Button } from '../../atoms'
import { DetailCard } from '../../organisms'

// const items = [
//   {
//     title: 'Module 1៖',
//     content: [
//       'Learn and understanding about Git , Bitbucket & Jira , RACI Chart , Atomic Design , Project Structure',
//       'Learn about basic Web Development ( HTML/CSS/JavaScript )',
//       'Web Design:  UX/UI Design & Figma',
//     ],
//     main: true,
//   },
//   {
//     title: 'Module 2៖',
//     content: [
//       'Learn and understanding about Git , Bitbucket & Jira , RACI Chart , Atomic Design , Project Structure',
//       'Learn about basic Web Development ( HTML/CSS/JavaScript )',
//       'Web Design:  UX/UI Design & Figma',
//     ],
//     main: false,
//   },
//   {
//     title: 'Module 3៖',
//     content: [
//       'Learn and understanding about Git , Bitbucket & Jira , RACI Chart , Atomic Design , Project Structure',
//       'Learn about basic Web Development ( HTML/CSS/JavaScript )',
//       'Web Design:  UX/UI Design & Figma',
//     ],
//     main: false,
//   },
//   {
//     title: 'Module 4៖',
//     content: [
//       'Learn and understanding about Git , Bitbucket & Jira , RACI Chart , Atomic Design , Project Structure',
//       'Learn about basic Web Development ( HTML/CSS/JavaScript )',
//       'Web Design:  UX/UI Design & Figma',
//     ],
//     main: false,
//   },
// ]

const DetailPageBodySection = ({ info }) => {
  console.log(info?.data?.data)

  return (
    <div className="desktop:max-w-[1296px] mx-auto px-10 desktop:px-20">
      <Typography className="text-md desktop:text-lg ">
        About Scholarship
      </Typography>
      <div className="w-full h-1 bg-primary-300 mt-4 mb-4 text-md desktop:text-lg "></div>
      <Typography size="md">
        These all satisfy the qualifications and benefits for this scholarship.
      </Typography>

      <div className="flex flex-col gap-8 items-center justify-center mt-20 mb-20">
        <div className="w-[90%] border-2 border-gray-500 p-8 flex flex-col gap-4 rounded-lg">
          <Typography color="text-black" className="text-md desktop:text-lg">
            Requirements
          </Typography>
          <div className="flex flex-col gap-2">
            {info?.data?.data.requirements.map((item, index) => {
              return (
                <div key={item._id} className="flex gap-2">
                  <Typography color="text-gray-500 text-sm tablet:text-md desktop:text-md">
                    {index + 1}.
                  </Typography>
                  <Typography color="text-gray text-sm tablet:text-md desktop:text-md leading-5">
                    {item.requirement}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>
        <div className="w-[90%] border-2 border-gray-500 p-8 flex flex-col gap-4 rounded-lg">
          <Typography color="text-black" className="text-md desktop:text-lg">
            Benefits
          </Typography>
          <div className="flex flex-col gap-2">
            {info?.data?.data.benefits.map((item, index) => {
              return (
                <div key={item._id} className="flex gap-2">
                  <Typography color="text-gray-500 text-sm tablet:text-md desktop:text-md">
                    {index + 1}.
                  </Typography>
                  <Typography color="text-gray text-sm tablet:text-md desktop:text-md leading-5">
                    {item.benefit}
                  </Typography>
                </div>
              )
            })}
          </div>
        </div>

        {/* {items.map((item, index) => {
          return <DetailCard key={index} {...item} />
        })} */}
      </div>
    </div>
  )
}

export default DetailPageBodySection
