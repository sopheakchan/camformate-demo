import React, { useState } from 'react'
import { Typography } from '../../atoms'
import Image from 'next/image'
import Link from 'next/link'
import ReactStars from 'react-stars'
import { Images } from '../../../../../apps/client/assets'
import ShareModal from '../share-modal/ShareModal'
import { AiOutlineShareAlt } from 'react-icons/ai'

export const InfoCard = ({ data }) => {
  const [shareModalShow, setShareModalShow] = useState(false)
  const { _id, school_name, description, location, image, rating, website } =
    data
  const locationIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Outline"
      viewBox="0 0 24 24"
      width="25"
      height="25"
    >
      <path d="M12,6a4,4,0,1,0,4,4A4,4,0,0,0,12,6Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,12Z" />
      <path d="M12,24a5.271,5.271,0,0,1-4.311-2.2c-3.811-5.257-5.744-9.209-5.744-11.747a10.055,10.055,0,0,1,20.11,0c0,2.538-1.933,6.49-5.744,11.747A5.271,5.271,0,0,1,12,24ZM12,2.181a7.883,7.883,0,0,0-7.874,7.874c0,2.01,1.893,5.727,5.329,10.466a3.145,3.145,0,0,0,5.09,0c3.436-4.739,5.329-8.456,5.329-10.466A7.883,7.883,0,0,0,12,2.181Z" />
    </svg>
  )

  return (
    <div className="relative w-[300px] h-[400px] bg-white drop-shadow-md shadow-lg p-2 flex flex-col gap-2 rounded-lg">
      {/* share modal */}
      <ShareModal
        showModal={shareModalShow}
        onClose={() => setShareModalShow(false)}
        shareUrl={`https://camformant.com/info/${_id}`}
        title={`Camformant - ${school_name}`}
        image={image}
        description={description}
      />

      <div className="w-full h-[180px] overflow-hidden">
        <Image
          src={image}
          width={300}
          height={300}
          alt="school"
          className="w-full h-full object-cover hover:scale-110 ease-linear duration-200"
        />
      </div>
      <div className="flex flex-col p-4">
        <Typography size="sm" color="text-primary" className="leading-6">
          {school_name}
        </Typography>

        <Typography
          color="text-gray-500"
          className="text-[14px] truncate tracking-wide"
        >
          {description}
        </Typography>

        <div className="flex gap-2 items-center">
          <Typography size="sm" color="text-black" fontWeight="bold">
            {rating}
          </Typography>
          <div>
            <ReactStars count={rating} size={24} color1={'#ffd700'} />
          </div>
        </div>

        <div className="flex gap-2 items-end justify-start">
          <span className="fill-primary">{locationIcon}</span>
          <Typography className="text-[12px]" color="text-black">
            {location}
          </Typography>
        </div>

        <Link
          href={`/info/${_id}`}
          className="w-[100px] bg-primary text-center rounded-md p-2 text-white mt-4 cursor-pointer hover:bg-primary hover:text-white ease-linear duration-200"
        >
          See more
        </Link>
      </div>
      {/* share button  */}
      <div
        className="absolute right-[10px] bottom-[20px] bg-primary rounded-full p-2 cursor-pointer active:scale-110"
        onClick={() => setShareModalShow(true)}
      >
        <AiOutlineShareAlt className="text-md text-white" />
      </div>
    </div>
  )
}
