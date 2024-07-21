import React, { useState } from 'react'
import Image from 'next/image'
import { BsBoxArrowInUpRight } from 'react-icons/bs'
import { Button, Spinner, Alert } from '../../atoms'
import { MyModal, ShareModal } from '../../organisms'
import axios from 'axios'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { SeoMeta } from '../../../../../apps/client/helper/services/SeoMeta'

import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

function DetailPageBodySection1({ info, favorite, setFavorite }) {
  const { token, uid } = useAuth()

  //states
  const [loading, setLoading] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [message, setMessage] = useState('')

  // states for alert messages
  const [alertMessage, setAlertMessage] = useState('')
  const [alertShow, setAlertShow] = useState(false)
  const [alertType, setAlertType] = useState('')

  const [shareModalShow, setShareModalShow] = useState(false)

  const date = new Date(info?.deadline)
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  // apply function
  const handleApply = async () => {
    setLoading(true)
    const data = {
      announcement: {
        type: 'scholarships',
        id: info._id,
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
        { _id: info._id, type: 'scholarships' },
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
        data: { _id: info._id, type: 'scholarships' },
      })
      .then(response => {
        setFavorite(!favorite)
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <section class="bg-white bg- py-1 tablet:py-8 desktop:py-10">
      <SeoMeta
        title={info?.school_name}
        description={info?.description}
        img={info?.image_url}
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
        shareUrl={`https://camformant.com/scholarships/${info?._id}`}
        title={`Camformant - ${
          info?.school_name ? info?.school_name + ', ' : ''
        } ${info?.scholarship_name}`}
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

      <div class="w-[90%] desktop:max-w-[1200px] mx-auto tablet:overflow-hidden tablet:px-4">
        <div class="flex flex-wrap -mx-4">
          {/* images and apply button  */}
          <div class="w-full desktop:w-1/2 flex flex-col items-center gap-4 px-4 mb-4 desktop:mb-0">
            <Image
              src={info?.image_url}
              alt="Scholarship Image"
              class="w-full tablet:w-3/4 desktop:w-3/4 h-auto rounded-xl"
              width={500}
              height={500}
              quality={100}
            />
            <button
              className="w-full desktop:w-3/4 hidden desktop:flex gap-2 items-center justify-center px-5 py-3 border-2 bg-primary hover:bg-white-100 hover:border-2 border-primary hover:border-primary hover:text-primary transition-all group rounded-lg"
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

            <button
              className="w-[80%] tablet:w-[50%] fixed bottom-[20px] flex desktop:hidden gap-2 items-center justify-center px-5 py-2 border-2 bg-primary hover:bg-white-100 hover:border-2 border-primary hover:border-primary hover:text-primary transition-all group rounded-lg"
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

            <div className="w-full tablet:w-3/4 desktop:w-3/4 flex gap-2 items-center justify-between">
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

          {/* content  */}
          <div class="w-full desktop:w-1/2 px-4">
            <h1 class="text-[30px] font-bold mb-4">{info?.scholarship_name}</h1>
            <p class="text-[18px] mb-4 text-primary">{info?.school_name}</p>
            <p class="text-[18px] font-medium mb-4">
              Deadline: <span className="text-danger">{formattedDate}</span>
            </p>

            {/* major  */}
            <h2 class="text-[18px] font-medium">Majors</h2>
            <p class="text-[18px] mb-4">{info?.major}</p>

            <h2 class="text-[18px] font-medium">Faculty/Department</h2>
            <p class="text-[18px] mb-4">{info?.faculty}</p>
            {info?.description ? (
              <>
                <h2 class="text-[18px] font-medium ">Description</h2>
                <p class="text-[18px] mb-4">{info?.description}</p>
              </>
            ) : null}
            <p class="text-[18px] font-medium mb-4">
              Provided Scholarship:{' '}
              <span className="text-danger">
                {info?.price.amount}
                {info?.price.type == 'Percent %' ? '%' : '$'}
              </span>
            </p>
            <h2 class="text-lg">Scholarship Requirements</h2>
            <ul class="list-disc ml-6 mb-4">
              {info?.requirements?.map(r => {
                return <li class="text-[18px]">{r.requirement}</li>
              })}
            </ul>
            <p class="text-lg">Scholarship Benefits:</p>
            <ul class="list-disc ml-6 mb-4">
              {info?.benefits?.map(b => {
                return <li class="text-[18px]">{b.benefit}</li>
              })}
            </ul>

            <div className="flex flex-col rounded-lg bg-primary text-white p-2 bg-opacity-70">
              <p class="text-lg font-medium mb-4">Contact Methods :</p>
              <p class="text-[18px] font-medium mb-4">
                Phone: {info?.phone_number}
              </p>
              <p class="text-[18px] font-medium mb-4">
                Email: {info?.email || 'No email'}
              </p>
              <p class="text-[18px] font-medium mb-4">
                Address: {info?.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DetailPageBodySection1
