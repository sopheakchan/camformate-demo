import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import avatar from '../../../assets/images/avatar.jpg'
import aba from '../../../assets/images/aba.png'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { useQuery } from 'react-query'
import { MyModal, ShareModal } from '../../organisms'
import { Button, Spinner, Alert } from '../../atoms'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import axios from 'axios'
import { SeoMeta } from '../../../../../apps/client/helper/services/SeoMeta'

//icon
import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

const aboutCompany = `ABA Bank is Cambodia&apos;s leading private financial institution
(not state-owned enterprise) founded in 1996 as the Advanced Bank of
Asia Limited. In over 25 years of development and growth, ABA has
significantly strengthened its position in the market and broke into
the Top 3 commercial banks of the country. Today, ABA offers the
entire spectrum of services to customer segments covering SMEs,
micro businesses, and individuals. With 84 branches, 500+ ATMs, 600+
self-banking machines across the country, and advanced online
banking and mobile banking platforms ABA Bank reaches out to a large
number of customers with an array of modern financial services.`

const JobDetail = ({ job_id, favorite, setFavorite }) => {
  const { token, uid } = useAuth()

  //handle message
  const [message, setMessage] = useState('')

  const [more, setMore] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [loading, setLoading] = useState(false)

  // states for alert messages
  const [alertMessage, setAlertMessage] = useState('')
  const [alertShow, setAlertShow] = useState(false)
  const [alertType, setAlertType] = useState('')

  const [shareModalShow, setShareModalShow] = useState(false)

  const fetchJob = async () => {
    const response = await fetch(`${BASE_URL}/jobs/${job_id}`)
    return await response.json()
  }

  const { isLoading, error, data } = useQuery('job', fetchJob)

  if (isLoading) {
    return 'loading'
  }

  const dateObj = new Date(data?.data?.deadline)
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const handleApply = async () => {
    setLoading(true)
    const data = {
      announcement: {
        type: 'jobs',
        id: job_id,
      },
      message: message,
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/applications`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (response.data.status === 'Success') {
        setAlertMessage(response.data.message)
        setAlertShow(true)
        setAlertType('success')
      } else {
        console.log(response.data)
        setAlertMessage(response.data.message)
        setAlertShow(true)
        setAlertType('error')
      }
    } catch (error) {
      setAlertMessage(error.response.data.message)
      setAlertShow(true)
      setAlertType('error')
    }

    setLoading(false)
  }

  const addFav = () => {
    axios
      .post(
        `${BASE_URL}/users/${uid}/favorites`,
        { _id: job_id, type: 'jobs' },
        {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setFavorite(!favorite)
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
        data: { _id: job_id, type: 'jobs' },
      })
      .then(response => {
        setFavorite(!favorite)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <div className="mt-4 desktop:mt-12 mb-8 flex relative w-full desktop:max-w-[1296px] desktop:px-20 m-auto ">
      <SeoMeta
        title={data?.data?.job_name}
        description={data?.data?.description}
        img={data?.data?.imageUrl}
      />

      {/* Alert  */}
      <Alert
        message={alertMessage}
        setShow={setAlertShow}
        show={alertShow}
        type={alertType}
        onClose={() => {
          setAlertMessage('')
          setAlertShow(false)
          setAlertType('')
        }}
        closable={true}
      />

      {/* share modal */}
      <ShareModal
        showModal={shareModalShow}
        onClose={() => setShareModalShow(false)}
        shareUrl={`https://camformant.com/job/${job_id}`}
        title={`Camformant - ${data?.data.job_name}`}
      />

      {/* Modal  */}
      <MyModal show={modalShow} onClose={() => setModalShow(false)}>
        <div className="flex flex-col gap-8 justify-center items-center">
          <span className="font-medium text-black">Do you want to apply ?</span>
          <div className="flex flex-col gap-4 justify-start items-start w-full">
            <label id="message" className="text-black">
              Message to the recruiter{' '}
              <span className="text-gray-500 tracking-wider">(Optional)</span>
            </label>
            <textarea
              name="message"
              placeholder="Your message here"
              cols={10}
              rows={5}
              onChange={e => setMessage(e.target.value)}
              className="border-gray-500 border-[1px] border-opacity-20 py-2 px-4 w-full rounded-lg bg-gray-200 bg-opacity-20 text-black focus:outline-primary caret-primary resize-none"
            />
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <Button
              className="w-[30%] rounded-lg py-[15px] bg-gray-200 text-gray-500 bg-opacity-20 border-[1px] border-gray-500 active:scale-110"
              onClick={() => setModalShow(false)}
            >
              Cancel
            </Button>
            <Button
              className="w-[30%] rounded-lg py-[15px] bg-primary text-primary bg-opacity-20 border-[1px] border-primary active:scale-110"
              onClick={() => {
                handleApply()
                setModalShow(false)
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      </MyModal>

      {/* Spinner  */}
      {loading ? (
        <div className="absolute left-[50%] top-[50%] -ml-[35px] -mt-[35px]">
          <Spinner />
        </div>
      ) : null}

      {/* left */}
      <div className="w-[40%] hidden tablet:hidden desktop:flex pl-10 h-[400px] flex-col gap-5 sticky top-[120px] left-0 ">
        <div>
          <Image
            src={data?.data.imageUrl}
            alt="job"
            width={420}
            height={200}
            className="rounded-lg"
          />
        </div>
        <button
          className="flex gap-2 items-center justify-center px-5 py-3 border-2 bg-primary hover:bg-white-100 hover:border-2 border-primary hover:border-primary hover:text-primary transition-all group rounded-lg"
          onClick={() => setModalShow(true)}
        >
          <BsBoxArrowInUpRight
            size={22}
            className="text-white flex items-center justify-center group-hover:text-primary"
          />
          <span className="flex items-center justify-center text-white font-semibold group-hover:text-primary">
            Apply
          </span>
        </button>

        <div className="w-full flex gap-2 items-center justify-between">
          <Button
            className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-gray-200 bg-opacity-20 text-gray-500 border-[1px] border-gray-500 active:scale-110"
            onClick={() => setShareModalShow(true)}
          >
            <AiOutlineShareAlt className="text-lg" /> Share
          </Button>
          {favorite ? (
            <Button
              className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-danger text-white border-[1px] border-danger active:scale-110"
              onClick={removeFav}
            >
              <AiFillHeart className="text-lg" /> Favorite
            </Button>
          ) : (
            <Button
              className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-gray-200 bg-opacity-20 text-danger border-[1px] border-danger active:scale-110"
              onClick={addFav}
            >
              <AiOutlineHeart className="text-lg" /> Favorite
            </Button>
          )}
        </div>
      </div>

      {/* right */}
      <div className="w-full tablet:w-full desktop:w-[60%] px-10">
        <Image
          src={data?.data.imageUrl}
          alt="Job Image"
          width={200}
          height={150}
          quality={100}
          className="w-full tablet:w-[80%] tablet:mx-auto mb-4 rounded-lg flex desktop:hidden"
        />
        <h1 className="text-xl">{data?.data?.job_name}</h1>
        <p className="text-gray-500">
          {data?.data?.company}, {data?.data?.location} ({data?.data?.work_type}
          )
        </p>

        <div className="mt-5 flex flex-col  gap-2">
          <p className="text-danger font-semibold ">
            DEADLINE: {formattedDate} <span className="text-black">, </span>
            <span className="font-semibold text-primary">
              {data?.data?.slots} positions
            </span>
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              {/* <span>{SVGIcons.DollarIcon()}</span> */}
              <span>Salary: </span>
              <span className="font-semibold">&nbsp;{data?.data?.salary}</span>
              <span>( &nbsp;{data?.data?.schedule} )</span>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <Image
              src={data?.data.user_profile || avatar}
              alt="avatar"
              width={30}
              height={30}
              className="w-[30px] h-[30px] rounded-full border-2 border-primary-300"
            />
            {/* {data?.data?.user_id} */}
            <p> {data?.data.username} is hiring for this job</p>
          </div>

          {/* share & add favorite buttons */}
          <div className="w-full tablet:w-[70%] tablet:mx-auto flex desktop:hidden gap-2 items-center justify-between">
            <Button
              className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-gray-200 bg-opacity-20 text-gray-500 border-[1px] border-gray-500 active:scale-110"
              onClick={() => setShareModalShow(true)}
            >
              <AiOutlineShareAlt className="text-lg" /> Share
            </Button>
            {favorite ? (
              <Button
                className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-danger text-white border-[1px] border-danger active:scale-110"
                onClick={removeFav}
              >
                <AiFillHeart className="text-lg" /> Favorite
              </Button>
            ) : (
              <Button
                className="w-1/2 py-[12px] flex justify-center items-center gap-2 rounded-lg bg-gray-200 bg-opacity-20 text-danger border-[1px] border-danger active:scale-110"
                onClick={addFav}
              >
                <AiOutlineHeart className="text-lg" /> Favorite
              </Button>
            )}
          </div>
          {/* apply button  */}
          <div className="fixed bottom-[20px] w-[300px] tablet:w-[400px] left-[50%] -ml-[150px] tablet:-ml-[200px] desktop:hidden">
            <button
              className="w-full flex gap-2 items-center justify-center px-7 py-2 rounded-lg bg-opacity-100 border-2 border-primary bg-primary hover:bg-white-100 hover:border-2 hover:border-primary hover:text-primary transition-all group"
              onClick={() => setModalShow(true)}
            >
              <BsBoxArrowInUpRight
                size={22}
                className="text-white flex items-center justify-center group-hover:text-primary"
              />
              <span className="flex items-center justify-center text-white font-semibold group-hover:text-primary">
                Apply
              </span>
            </button>
          </div>
        </div>

        {/* desktop description and tablet description*/}
        <div className="hidden tablet:block mt-4 desktop:block">
          <p className="text-lg">Job Description</p>
          {data?.data?.description || 'No Description'}
        </div>

        {/* mobile  */}
        <div className="mt-4 tablet:hidden desktop:hidden">
          <p className="text-lg">Job Description</p>
          {more
            ? data?.data?.description
            : `${data?.data?.description.slice(0, 200)}`}
          <button className="text-primary" onClick={() => setMore(!more)}>
            {more ? 'Show Less' : 'Show More...'}
          </button>
        </div>
        <div className="mt-4">
          <p className="text-lg">Job Requirements</p>
          <div>
            {data?.data?.requirements.map(item => {
              return <div key={item._id}>- {item.requirement}</div>
            })}
          </div>
        </div>
        <div className="mt-4">
          <p className="text-lg">Benefits</p>
          {data?.data?.benefits.map(item => {
            return <div key={item._id}>- {item.benefit}</div>
          })}
        </div>

        {/* <div className="mt-4">
          <p className="text-lg">Working Conditions:</p>

          <div>- Monday to Friday from 8:30AM to 5:30PM</div>

          <div>- 1h break from 12:00PM to 1:00PM</div>

          <div>- Saturday is full (Twice per month)</div>
        </div> */}

        {/* <div className="mt-5 p-6 border-2 border-gray-200 rounded-lg">
          <p className="text-md mb-4 text-primary font-semibold">
            Company Background
          </p>
          <div className="flex justify-between">
            <div className="flex gap-4">
              <Image src={aba} alt="aba image" width={60} height={60} />
              <div>
                <p className="font-semibold">ABC Tech</p>
                <p className="text-gray-500 text-sm">Since 2015</p>
              </div>
            </div>
            <Link href="#">
              <TiArrowForward size={30} />
            </Link>
          </div>
          <div className="mt-5 hidden tablet:block desktop:block">
            {aboutCompany}
          </div>
          <div className="mt-5 tablet:hidden desktop:hidden">
            {more ? aboutCompany : `${aboutCompany.slice(0, 200)}`}
            <button className="text-primary" onClick={() => setMore(!more)}>
              {more ? 'Show Less' : 'Show More...'}
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default JobDetail
