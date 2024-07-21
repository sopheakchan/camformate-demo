import React, { useState, useEffect } from 'react'
import { Typography, MajorsComponent, MajorImage } from '../../atoms'
import Image from 'next/image'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { SeoMeta } from '../../../../../apps/client/helper/services/SeoMeta'

const icons = <FaLongArrowAltRight />

// code when fetch from back-end

const InfoDetailPage = ({ data }) => {
  const [value, setData] = useState(data?.data?.faculties[0])

  useEffect(() => {
    setData(data?.data?.faculties[0])
  }, [data?.data?.faculties[0]])

  return (
    <div className="max-w-[1296px] px-5 tablet:px-10 desktop:px-20 mx-auto">
      <SeoMeta
        title={data?.data.school_name}
        description={data?.data.description}
        img={data?.data.image}
      />
      {/* for desktop */}

      {/* Hero Section */}
      <div className="w-full mb-8 mt-4 desktop:mt-0 tablet:mb-16 desktop:mb-4 desktop:pt-16">
        <div className="flex flex-col gap-5 tablet:gap-10 tablet:flex-col desktop:flex-row desktop:gap-20 ">
          <Image
            src={data?.data.image}
            alt="University Image"
            width={550}
            height={300}
            className="w-screen tablet:w-[50%] tablet:mx-auto desktop:w-[550px] desktop:h-[450px] rounded-lg"
          />
          <div className="flex flex-col tablet:gap-3 tablet:mt-0 desktop:gap-7  desktop:mt-6">
            <Typography
              fontWeight="semi-bold"
              color="text-primary"
              className="tablet:text-lg desktop:text-xl"
            >
              {data?.data.school_name}
            </Typography>
            <Typography
              size="sm"
              color="text-gray-500"
              className=" tablet:w-[100%] desktop:w-[550px] tracking-normal leading-7"
            >
              {data?.data.description}
            </Typography>
          </div>
        </div>
      </div>
      {/* body Section */}
      <div className="w-full mb-10  mx-auto  ">
        <div className="flex pb-4 gap-32">
          <Typography className="hidden tablet:block desktop:block desktop:text-[25px] desktop:text-gray-500 desktop:my-5 text-[17px] font-semibold desktop:text-md border-primary border-b-4 ">
            Majors of {data?.data.school_name}
          </Typography>
        </div>
        <div className="hidden tablet:grid tablet:grid-cols-[55%,45%] desktop:grid desktop:grid-cols-[2fr_1fr] desktop:gap-14 items-start relative">
          {/* left */}
          <div className="flex flex-col tablet:w-[90%] desktop:w-[600px] gap-7">
            <Typography size="sm" className="tracking-normal leading-8">
              {data?.data.major_description}
            </Typography>
            <div>
              <Typography
                size="lg"
                fontWeight="semi-bold"
                color="text-gray-500"
                className="mb-4"
              >
                Majors in the {value?.faculty_name}
              </Typography>
              <div className=" tablet:flex tablet:flex-wrap desktop:grid desktop:grid-cols-[225px_225px] tablet:gap-2 desktop:gap-8">
                {value?.subjects.map((major, index) => {
                  // console.log(major)
                  return <MajorImage {...major} key={index} />
                })}
              </div>
            </div>
          </div>
          {/* right */}
          <div className="flex flex-col tablet:items-end sticky tablet:top-20 desktop:top-24   ">
            {data?.data.faculties.map((item, index) => {
              console.log('......', item)
              return (
                <MajorsComponent
                  icon={icons}
                  faculty={item.faculty_name}
                  key={item.index}
                  item={item}
                  setData={setData}
                  curDataKey={value?.index}
                />
              )
            })}
          </div>
        </div>
        {/* for mobile */}

        <div className="tablet:hidden desktop:hidden">
          <p className="text-[20px] tracking-wider font-semibold inline border-b-[3px] border-primary">
            Faculties of {data?.data.school_name}
          </p>
          <div className="flex mt-5 mb-5 overflow-hidden overflow-x-scroll">
            {data?.data.faculties?.map((item, index) => {
              // console.log(item)
              return (
                <MajorsComponent
                  icon={icons}
                  faculty={item?.faculty_name}
                  key={item?._id}
                  item={item}
                  setData={setData}
                  curDataKey={value?._id}
                />
              )
            })}
          </div>
          <div>
            <div className="mt-5">
              <Typography
                size="lg"
                fontWeight="semi-bold"
                color="text-gray-500"
                className="mb-4"
              >
                Majors in the {value?.faculty_name}
              </Typography>
              <div className=" grid place-items-center grid-cols-2 gap-y-6 gap-x-0">
                {data?.data.faculties[0]?.subjects.map((major, index) => {
                  return <MajorImage {...major} key={index} />
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// const InfoDetailPage = () => {
//   const setValue = e => {
//     console.log(e)
//   }
//   const [data, setData] = useState(allFaculties[0])
//   const schoolDescription = {
//     name: 'Royal University of Phnom Penh',
//     description: ` There is nowhere quite like International school of Phnom Penh for
//     students to learn and grow. We have an incredible campus, full IB
//     program and caring,dedicated international teachers. Moreover,
//     there are many majors that have in our university. Let our school
//     guide u to reach your passions.`,
//   }
//   return (
//     <div className="max-w-[1296px] px-5 tablet:px-10 desktop:px-20 mx-auto">
//       {/* for desktop */}

//       {/* Hero Section */}
//       <div className="w-full mb-8 tablet:mb-16 tablet:mt-10 desktop:mb-0 desktop:h-[calc(100vh_-_60px)]  desktop:pt-16">
//         <div className=" flex flex-col gap-5 tablet:gap-10 tablet:flex-row desktop:flex-row desktop:gap-20 ">
//           <Image
//             src={University2}
//             alt="University Image"
//             width={550}
//             height={300}
//             className="w-screen tablet:w-[40%]  desktop:w-[550px] desktop:h-[450px] "
//           />

//           <div className="flex flex-col tablet:gap-3 tablet:mt-0 desktop:gap-7  desktop:mt-14">
//             <Typography
//               fontWeight="semi-bold"
//               color="text-primary"
//               className="tablet:text-lg desktop:text-xl"
//             >
//               {schoolDescription.name}
//             </Typography>
//             <Typography
//               size="sm"
//               color="text-gray-500"
//               className=" tablet:w-[100%] desktop:w-[420px] tracking-normal leading-7"
//             >
//               {schoolDescription.description}
//             </Typography>
//           </div>
//         </div>
//       </div>
//       {/* body Section */}
//       <div className="w-full mb-10  mx-auto  ">
//         <div className="flex pb-4 gap-32">
//           <Typography className="hidden tablet:block desktop:block text-[17px] font-semibold desktop:text-md border-primary border-b-4 ">
//             Majors of Royal University of Phnom Penh
//           </Typography>
//         </div>
//         <div className="hidden tablet:grid tablet:grid-cols-[55%,45%] desktop:grid desktop:grid-cols-[2fr_1fr] desktop:gap-14 items-start relative">
//           {/* left */}
//           <div className="flex flex-col tablet:w-[90%] desktop:w-[600px] gap-7">
//             <Typography size="sm" className="tracking-normal leading-8">
//               {facultyDescription}
//             </Typography>
//             <div>
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 Associate and Bachelor Degree
//               </Typography>
//               <div className=" tablet:flex tablet:flex-wrap desktop:grid desktop:grid-cols-[225px_225px] tablet:gap-2 desktop:gap-8">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//             <div>
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 Master Degree
//               </Typography>
//               <div className="tablet:flex tablet:flex-wrap desktop:grid desktop:grid-cols-[225px_225px] tablet:gap-2 desktop:gap-8">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//             <div>
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 PHD Degree
//               </Typography>
//               <div className=" tablet:flex tablet:flex-wrap desktop:grid desktop:grid-cols-[225px_225px] tablet:gap-2 desktop:gap-8">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//           </div>

//           {/* right */}
//           <div className="flex flex-col tablet:items-end sticky tablet:top-20 desktop:top-24   ">
//             {allFaculties.map(item => {
//               return (
//                 <MajorsComponent
//                   icon={item.icon}
//                   faculty={item.label}
//                   key={item.key}
//                   index={item.key}
//                   item={item}
//                   setData={setData}
//                   curDataKey={data.key}
//                 />
//               )
//             })}
//           </div>
//         </div>

//         {/* for mobile */}

//         <div className=" tablet:hidden desktop:hidden">
//           <p className="text-[20px] tracking-wider font-semibold inline border-b-[3px] border-primary">
//             Faculties
//           </p>
//           <div className="flex mt-5 mb-5 overflow-hidden overflow-x-scroll">
//             {allFaculties.map(item => {
//               return (
//                 <MajorsComponent
//                   icon={item.icon}
//                   faculty={item.label}
//                   key={item.key}
//                   index={item.key}
//                   item={item}
//                   setData={setData}
//                   curDataKey={data.key}
//                 />
//               )
//             })}
//           </div>
//           <div>
//             <div className="mt-5">
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 Associate and Bachelor Degree
//               </Typography>
//               <div className=" grid place-items-center grid-cols-2 gap-y-6 gap-x-0">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//             <div className="mt-5">
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 Master Degree
//               </Typography>
//               <div className="grid place-items-center grid-cols-2 gap-y-6 gap-x-0">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//             <div className="mt-5">
//               <Typography
//                 size="lg"
//                 fontWeight="semi-bold"
//                 color="text-gray-500"
//                 className="mb-4"
//               >
//                 PHD Degree
//               </Typography>
//               <div className=" grid place-items-center grid-cols-2 gap-y-6 gap-x-0">
//                 {data.majors.map((major, index) => {
//                   return <MajorImage {...major} key={index} />
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

export default InfoDetailPage
