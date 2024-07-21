import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { avatarImage } from '../../../assets'
import { GoLocation } from 'react-icons/go'
import { BiTime } from 'react-icons/bi'
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import axios from 'axios'
import { ShareModal } from '../../organisms'
import { AiOutlineShareAlt } from 'react-icons/ai'

const JobCard = ({ allItems }) => {
  const { uid, token } = useAuth()

  const [shareModalShow, setShareModalShow] = useState(false)
  const [fav, setFav] = useState(false)
  const {
    job_name,
    company,
    work_type,
    salary,
    deadline,
    location,
    _id,
    user_id,
    imageUrl,
    user_profile,
    description,
  } = allItems

  const dateObj = new Date(deadline)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const [itemId, setItemId] = useState('')
  const handleSubmit = () => {
    axios
      .post(
        `${BASE_URL}/users/${uid}/favorites`,
        { _id, type: 'jobs' },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setFav(!fav)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const removeFav = () => {
    axios
      .delete(`${BASE_URL}/users/${uid}/favorites`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
        data: { _id, type: 'jobs' },
      })
      .then(response => {
        setFav(!fav)
      })
      .catch(err => {
        console.error(err)
      })
  }
  const [data, setData] = useState([])

  const getJobs = async () => {
    const response = await fetch(`${BASE_URL}/users/${uid}`)
    const users = await response.json()

    return setData(users?.data?.attributes.favorites)
  }
  useEffect(() => {
    getJobs()
  }, [])

  useEffect(() => {
    data &&
      data.map(d => {
        if (d.id == _id) {
          setFav(true)
        }
      })
  }, [data])

  return (
    <div className="relative w-[240px] h-[300px]">
      {/* share modal */}
      <ShareModal
        showModal={shareModalShow}
        onClose={() => setShareModalShow(false)}
        shareUrl={`https://camformant.com/job/${_id}`}
        title={`Camformant - ${job_name}`}
        image={imageUrl}
        description={description}
      />

      <Link href={`/job/${_id}`}>
        <div className="relative w-[250px] h-[320px] overflow-hidden shadow-lg bg-white leading-5 rounded-lg">
          <Image
            src={imageUrl && imageUrl}
            alt="Job"
            width={400}
            height={150}
            className="w-full h-[110px] object-cover aspect-[3/2]"
          />
          <div className="flex px-2 absolute top-[80px] left-0">
            <Image
              src={user_profile !== 'none' ? user_profile : avatarImage}
              alt="avatar"
              width={40}
              height={40}
              className="bg-white rounded-full border-2 border-primary aspect-square object-cover"
            />
          </div>
          <div className="absolute top-[8px] -right-[42px] rotate-[30deg]  flex flex-col justify-center items-center text-[11px] gap-1 text-white px-1 w-[150px]  bg-primary">
            {work_type}
          </div>

          <div className="p-4 mt-2">
            <h2 className="text-[16px] font-semibold mb-2 text-primary">
              {job_name}
            </h2>
            <p className="text-[13px] text-gray-600 mb-2">{company}</p>
            <p className="text-[16px] font-semibold mb-2 text-danger">
              {salary}
            </p>
            <p className="text-[13px] items-center text-gray-600 mb-2 flex gap-2">
              <BiTime className="text-primary text-[13px]" />
              <span>{formattedDate}</span>
            </p>
            <div className="flex justify-center text-[13px] items-center gap-2">
              <GoLocation className="text-primary text-[13px]" />
              <span className="w-full h-[23px] ">{location}</span>
            </div>
          </div>
        </div>
      </Link>
      <div
        onClick={() => {
          if (!fav) {
            handleSubmit()
          } else {
            removeFav()
          }
        }}
        className="absolute right-[7px] top-[112px] cursor-pointer"
      >
        {fav ? (
          <MdFavorite size={23} className="text-primary " />
        ) : (
          <MdOutlineFavoriteBorder size={23} className="text-primary " />
        )}
      </div>
      <div
        className="absolute left-[5px] top-[10px] bg-white rounded-full p-2 cursor-pointer active:scale-110"
        onClick={() => setShareModalShow(true)}
      >
        <AiOutlineShareAlt className="text-md text-primary" />
      </div>
    </div>
  )
}

export default JobCard
