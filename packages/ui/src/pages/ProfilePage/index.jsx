import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Typography, Button, ImageSkeleton, Alert } from '../../atoms'
import { useRouter } from 'next/router'
import {
  HiOutlinePencil,
  HiOutlineEye,
  HiOutlineNewspaper,
} from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineCamera } from 'react-icons/ai'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import EditProfile from './edit'
import { MyModal } from '../../organisms'
import { uploadImage } from '../../../../../apps/client/helper/services/FetchAPI'
import { Images } from '../../../../../apps/client/assets'

function ProHero({ user }) {
  const router = useRouter()

  //firebase
  const { logout } = useAuth()

  // states
  const [show, setShow] = useState(false)
  const [file, setFile] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [message, setMessage] = useState({
    text: '',
    isSuccess: false,
  })
  const [isAlert, setIsAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputRef = useRef(null)

  // to open file explorer
  const handleFileExploreOpen = () => {
    inputRef.current.click()
  }

  // handle file change when choosing image
  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }

    setImageFile(fileObj)
    const reader = new FileReader(fileObj)
    reader.onload = event => {
      setFile(event.target.result)
      console.log(event.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  // handle logout clicked
  const handleLogout = () => {
    router.push('/')
    logout()
  }

  // handle when confirm is clicked after choosing image
  const handleChangeImage = async () => {
    const id = user?.id
    let formData = new FormData()
    formData.append('image', imageFile)

    setLoading(true)
    return await uploadImage(`/users/${id}`, 'PATCH', formData)
      .then(res => {
        if (res.status === 'Success') {
          setFile('')
          setImageFile('')
          setMessage({
            text: res.message,
            isSuccess: true,
          })
          setLoading(false)
          setIsAlert(true)
        } else {
          setFile('')
          setImageFile('')
          setMessage({
            text: res.message,
            isSuccess: false,
          })
          setLoading(false)
          setIsAlert(true)
        }
      })
      .catch(err => {
        setFile('')
        setImageFile('')
        setMessage({
          text: err.message,
          isSuccess: false,
        })
        setLoading(false)
        setIsAlert(true)
      })
  }

  return (
    <div className="tablet:w-full tablet:h-screen desktop:h-full desktop:max-w-[1296px] overflow-hidden mx-auto mb-8 mt-8">
      {/* Alert */}
      <Alert
        message={message.text}
        type={message.isSuccess ? 'success' : 'error'}
        show={isAlert}
        setShow={setIsAlert}
        closable={true}
        onClose={() => setMessage({ text: '', isSuccess: false })}
      />

      {/* edit form  */}
      <EditProfile show={show} setShow={setShow} user={user} />

      {/* choosing image  */}
      {file && (
        <MyModal show={true} onClose={() => setFile('')}>
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="group relative">
              <Image
                src={file}
                alt="Preview Image"
                width={200}
                height={200}
                className="rounded-full"
              />
              <div
                className="hidden group-hover:flex absolute right-0 left-0 top-0 bottom-0 bg-gray-500 rounded-full bg-opacity-50 justify-center items-center text-white gap-2 cursor-pointer"
                onClick={handleFileExploreOpen}
              >
                Choose Image <AiOutlineCamera className="text-lg" />
              </div>
            </div>
            <div className="flex gap-4 justify-between">
              <Button
                className="rounded-lg h-[40px] w-1/2 text-black"
                variant="outlined"
                intent="secondary"
                onClick={() => setFile(null)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-lg w-1/2 h-[40px] flex gap-2 items-center justify-center"
                onClick={handleChangeImage}
                isSpinning={loading}
                spinColor="white"
              >
                Confirm
              </Button>
            </div>
          </div>
        </MyModal>
      )}

      <div className="w-[95%] desktop:w-full mx-auto my-3 h-[200px] tablet:h-60 rounded-tl-[30px] rounded-tr-[30px] tablet:rounded-tl-[50px] tablet:rounded-tr-[50px] desktop:rounded-tl-[50px] desktop:rounded-tr-[50px] bg-primary bg-opacity-70 relative">
        <div className="w-[200px] absolute -bottom-[50%] left-[50%] -ml-[100px] flex flex-col gap-2 justify-center items-center">
          <div className="relative">
            {user?.image !== 'none' ? (
              <Image
                src={user?.image}
                width={120}
                height={120}
                quality={100}
                alt="profile"
                className="w-[120px] h-[120px] rounded-full border-4 border-white aspect-square object-cover"
              />
            ) : (
              <ImageSkeleton active={true} loading={true} />
            )}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              className="bg-primary absolute -right-0 bottom-0 text-white p-1 rounded-full cursor-pointer active:scale-110"
              onClick={handleFileExploreOpen}
            >
              {<AiOutlineCamera />}
            </div>
          </div>
          <Typography size="lg" color="text-primary" fontWeight="bold">
            {user?.username}
          </Typography>
          <div
            className="text-gray-500 flex gap-2 items-center opacity-70 cursor-pointer"
            onClick={() => setShow(true)}
          >
            <Typography size="sm">Edit</Typography> <HiOutlinePencil />
          </div>
        </div>
        <Button
          className="hidden tablet:flex desktop:flex rounded-lg absolute top-[30px] right-[30px] bg-white text-primary active:scale-110"
          icon={<FiLogOut />}
          iconAppearance="text-primary"
          reverse={true}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div className="mt-32 p-4 flex flex-col gap-4">
        <div className="flex flex-col tablet:flex-row desktop:flex-row items-center tablet:justify-evenly desktop:justify-evenly">
          <div className="w-full tablet:w-1/3 desktop:w-1/3 flex flex-col gap-2">
            {/* Email  */}
            <div className="flex flex-col gap-2  rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                Email
              </Typography>
              <Typography
                className="text-gray tracking-wide opacity-50"
                size="md"
              >
                {user?.email}
              </Typography>
            </div>

            {/* Representation  */}
            <div className="flex flex-col gap-2  rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                Representation
              </Typography>
              <Typography
                className="text-gray tracking-wide opacity-50"
                size="md"
              >
                {user?.representation}
              </Typography>
            </div>

            {/* Account type  */}
            <div className="flex flex-col gap-2  rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                Accouunt Type
              </Typography>
              <Typography
                className="text-gray tracking-wide opacity-50"
                size="md"
              >
                {user?.account_type}
              </Typography>
            </div>

            {/* Contact  */}
            <div className="flex flex-col gap-2  rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                Contacts
              </Typography>
              {user.contacts?.map((contact, index) => {
                return (
                  <Typography
                    key={index}
                    className="text-gray tracking-wide opacity-50"
                    size="md"
                  >
                    {contact.phone_number}
                  </Typography>
                )
              })}
            </div>
          </div>

          <div className="w-full tablet:w-1/3 desktop:w-1/3 flex flex-col gap-4">
            {/* Announcements  */}
            <div className="flex flex-col gap-2 border-2 border-primary border-opacity-50 rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                My Announcements
              </Typography>
              <Typography
                className="text-gray tracking-wide opacity-50"
                size="md"
              >
                17
              </Typography>
              <Button
                icon={<HiOutlineEye />}
                iconAppearance="text-lg"
                className="rounded-lg h-[40px] font-semibold active:scale-105"
              >
                View all
              </Button>
            </div>

            {/* favorites */}
            <div className="flex flex-col gap-2 border-2 border-primary border-opacity-50 rounded-lg p-2">
              <Typography
                size="md"
                color="text-primary"
                fontWeight="bold"
                className="opacity-70 rounded-lg"
              >
                My Favorites
              </Typography>
              <Typography
                className="text-gray tracking-wide opacity-50"
                size="md"
              >
                17
              </Typography>
              <Button
                icon={<HiOutlineEye />}
                iconAppearance="text-lg"
                className="rounded-lg h-[40px] font-semibold active:scale-105"
              >
                View all
              </Button>
            </div>

            <div className="underline text-primary flex gap-2 items-center cursor-pointer">
              <HiOutlineNewspaper /> My CVs
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProHero
