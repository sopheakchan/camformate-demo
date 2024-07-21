import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { SVGIcons } from '../../../../../../apps/client/assets'
import { avatar1 } from '../../../../assets'
import { useRouter } from 'next/navigation'
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md'
import { Skeleton } from 'antd'
import { BASE_URL } from '../../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../../apps/client/helper/hooks/auth'
import axios from 'axios'
import { AiOutlineShareAlt } from 'react-icons/ai'
import { ShareModal } from '../../../organisms'

const ScholarshipFavoriteCard = ({ data }) => {
  const router = useRouter()

  const { uid, token } = useAuth()

  const date = new Date(data?.attributes?.deadline)
  const options = { day: 'numeric', month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('en-US', options)

  // Get the current date and the deadline date from the database
  const currentDate = new Date()
  const deadlineDate = new Date(data?.attributes?.deadline)

  // Calculate the time difference between the two dates in milliseconds
  const timeDiff = deadlineDate.getTime() - currentDate.getTime()

  // Calculate the number of days left until the deadline
  const oneDay = 24 * 60 * 60 * 1000
  const daysLeft = Math.floor(timeDiff / oneDay)

  // Store the result as a string
  const timeLeft = `${daysLeft} days left`

  const detailHandler = id => {
    router.push(`/scholarships/${id}`)
  }

  const [fav, setFav] = useState(false)

  const handleSubmit = () => {
    axios
      .post(
        `${BASE_URL}/users/${uid}/favorites`,
        { _id: data?._id, type: 'scholarships' },
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
        data: { _id: data?._id, type: 'scholarships' },
      })
      .then(response => {
        setFav(!fav)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const [shareModalShow, setShareModalShow] = useState(false)
  const [scholarships, setScholarships] = useState([])

  const getScholarships = async () => {
    const response = await fetch(`${BASE_URL}/users/${uid}`)
    const users = await response.json()

    return setScholarships(users?.data?.attributes.favorites)
  }
  useEffect(() => {
    getScholarships()
  }, [])

  useEffect(() => {
    scholarships &&
      scholarships.map(d => {
        if (d.id == data?._id) {
          setFav(true)
        }
      })
  }, [scholarships, data])

  return (
    <div className="relative w-[300px] h-[350px] rounded-2xl bg-white shadow-lg flex flex-col justify-around">
      {/* share modal */}
      <ShareModal
        showModal={shareModalShow}
        onClose={() => setShareModalShow(false)}
        // shareUrl={`http://localhost:3000/job/${_id}`}
        shareUrl={`https://camformant.com`}
        title={`Camformant - ${
          data?.attributes?.school_name
            ? data?.attributes?.school_name + ', '
            : ''
        } ${data?.attributes?.scholarship_name}`}
      />

      <div
        className="w-full h-[150px] relative cursor-pointer"
        onClick={() => detailHandler(data?.id)}
      >
        {data ? (
          <Image
            src={data?.image_url}
            alt="Image"
            width={300}
            height={200}
            className="w-full h-full object-cover aspect-[3/2] rounded-tl-2xl rounded-tr-2xl"
          />
        ) : (
          <Skeleton.Image active={true} />
        )}

        <div className="w-full h-[50px] bg-gray-500 bg-opacity-70 absolute bottom-0 flex items-center justify-center text-white uppercase">
          Until {formattedDate}
        </div>

        <Image
          src={data?.user_profile || avatar1}
          alt="avatar"
          width={50}
          height={50}
          className="absolute bottom-[25px] left-[10px] aspect-square object-cover rounded-full border-2 border-primary"
        />
      </div>

      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <p className=" text-sm font-semibold text-primary tracking-wide">
            {data?.scholarship_name}
          </p>
          <div
            onClick={() => {
              if (!fav) {
                handleSubmit()
              } else {
                removeFav()
              }
            }}
            className="cursor-pointer"
          >
            {fav ? (
              <MdOutlineFavorite size={23} className="text-primary" />
            ) : (
              <MdFavoriteBorder size={23} className="text-primary" />
            )}
          </div>
        </div>
        <p className="text-gray font-semibold">{data?.slot} applicants</p>
      </div>

      <div className="flex flex-col justify-between p-2">
        <div className="p-2 rounded-lg flex items-center">
          <span>{SVGIcons.DollarIcon()}</span>
          <span className="text-danger">
            &nbsp;{data?.price?.amount}
            {data?.price?.type === 'Percent %' ? '%' : '$'}{' '}
            <span className="text-black">Scholarship</span>
          </span>
        </div>
        <div className="p-2 rounded-lg flex items-center">
          <span>{SVGIcons.TimeIcon()}</span>
          <span className="text-danger">&nbsp;{timeLeft}</span>
        </div>
        <div className="w-[95%] p-2 rounded-lg flex items-center">
          <span>{SVGIcons.LocationIcon()}</span>
          <span>&nbsp;{data?.location}</span>
        </div>
      </div>
      {/* share button  */}
      <div
        className="absolute left-[5px] top-[10px] bg-white rounded-full p-2 cursor-pointer active:scale-110"
        onClick={() => setShareModalShow(true)}
      >
        <AiOutlineShareAlt className="text-md text-primary" />
      </div>
    </div>
  )
}

export default ScholarshipFavoriteCard
