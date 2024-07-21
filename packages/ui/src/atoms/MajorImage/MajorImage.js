import React, { useState } from 'react'
import Image from 'next/image'
import { MyModal } from '../../organisms'

const MajorImage = props => {
  console.log(props)
  const { img, name, cost } = props
  const [show, setShow] = useState(false)
  return (
    <>
      <MyModal show={show} onClose={() => setShow(false)}>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-md">Price Per Year</div>

          {cost.map((item, index) => {
            return (
              <div className="w-2/6 ">
                {item.year} :{' '}
                <span className="text-primary text-md">${item.price} </span>
              </div>
            )
          })}
        </div>
      </MyModal>
      <div
        className="relative cursor-pointer w-[220px] h-[120px] rounded-[0.5rem] overflow-hidden flex justify-center items-center bg-primary-200"
        onClick={() => setShow(true)}
      >
        <Image
          src={img}
          width="240"
          height="80"
          alt="image"
          className="absolute w-full h-full top-0 left-0 brightness-50"
        />
        {/* blur-[2px] */}
        <span className="z-10 text-white font-semibold text-center">
          {name}
        </span>
      </div>
    </>
  )
}

export default MajorImage
