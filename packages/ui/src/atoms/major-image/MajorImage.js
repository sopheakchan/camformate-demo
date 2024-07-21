import React, { useState } from 'react'
import Image from 'next/image'
import { MyModal } from '../../organisms'
import PropTypes from 'prop-types'

const MajorImage = props => {
  const { subject_name, prices } = props
  const [show, setShow] = useState(false)
  return (
    <>
      <MyModal show={show} onClose={() => setShow(false)}>
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="text-md">Price Per Year</div>

          {prices.map((item, index) => {
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
        className="relative cursor-pointer text-[12px]  w-[160px] h-[90px] tablet:text-[15px] tablet:w-[150px] tablet:h-[70px] desktop:w-[220px] desktop:h-[120px] rounded-[0.5rem] overflow-hidden flex justify-center items-center drop-shadow-lg bg-primary-200"
        onClick={() => setShow(true)}
      >
        {/* blur-[2px] */}
        <span className="z-10 text-black font-semibold text-center">
          {subject_name}
        </span>
      </div>
    </>
  )
}

MajorImage.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.array,
}

export default MajorImage
