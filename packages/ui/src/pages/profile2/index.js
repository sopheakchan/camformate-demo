import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineCamera } from 'react-icons/ai'
import MyProfile from './MyProfile'
import MyAnnouncement from './MyAnnouncement'
import MyFavorite from './MyFavorite'
import MyCV from './MyCV'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import EditProfile from './EditProfile'
import { Alert, Button, ImageSkeleton } from '../../atoms'
import { MyModal } from '../../organisms'
import { uploadImage } from '../../../../../apps/client/helper/services/FetchAPI'
import { avatarImage } from '../../../assets'

const label = [
  {
    id: 1,
    name: 'Profile',
  },
  {
    id: 2,
    name: 'Announcements',
  },
  { id: 3, name: 'Favorites' },
  {
    id: 4,
    name: 'CV',
  },
]

const Profile = ({ user, setUser }) => {
  const [selection, setSelection] = useState(1)

  const { logout, token } = useAuth()

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
      user.image = event.target.result
    }
    reader.readAsDataURL(event.target.files[0])
  }

  // handle when confirm is clicked after choosing image
  const handleChangeImage = async () => {
    const id = user?.id
    let formData = new FormData()
    formData.append('image', imageFile)

    setLoading(true)
    return await uploadImage(`/users/${id}`, 'PATCH', formData, token)
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
    <div className="flex flex-col desktop:max-w-[1296px] mt-7 h-screen tablet:px-7 desktop:px-20 m-auto">
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
      {user !== null ? (
        <EditProfile
          show={show}
          setShow={setShow}
          user={user}
          setUser={setUser}
        />
      ) : (
        ''
      )}

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
                className="rounded-full aspect-square object-cover"
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

      <div className="w-full bg-white z-20 text-sm desktop:px-10 mb-7 left-0 ">
        <div className="w-full border-b-2 flex justify-start items-center  border-gray-100  px-4 py-3 ">
          <div className="group relative ">
            {user ? (
              <Image
                src={user.image !== 'none' ? user.image : avatarImage}
                alt="profile image"
                width={95}
                height={95}
                className={`w-[95px] h-[95px] rounded-full border-2 border-gray-200 aspect-square ${
                  user.image === 'none' ? 'object-contain' : 'object-cover'
                }`}
              />
            ) : (
              <ImageSkeleton active={true} loading={true} />
            )}

            {/* handle file explorer open  */}
            <input
              type="file"
              ref={inputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            <AiOutlineCamera
              className="absolute top-[70px] left-[75px] w-[23px] h-[23px] rounded-full text-sm bg-primary text-white p-1 cursor-pointer"
              onClick={handleFileExploreOpen}
            />
          </div>

          <div className=" ml-6">
            <div className="text-md font-semibold ">{user?.username}</div>
          </div>
        </div>
      </div>

      <div className="flex tablet:items-start w-full flex-col tablet:flex-row desktop:flex-row justify-between relative">
        <div className=" sticky top-[80px] tablet:top-[95px] desktop:top-[100px] z-40 left-0 tablet:h-[220px] desktop:h-[230px] text-sm bg-gray-100 tablet:bg-transparent desktop:bg-transparent desktop:pl-12 flex flex-row tablet:flex-col desktop:flex-col justify-center">
          {label.map((item, index) => {
            return (
              <button
                key={index}
                className={`${
                  index + 1 === selection
                    ? 'bg-primary-200 text-primary-300 font-semibold'
                    : 'text-gray-500 '
                } px-4 py-3 w-fit  rounded-3xl`}
                onClick={() => {
                  setSelection(index + 1)
                }}
              >
                {item.name}
              </button>
            )
          })}

          {/* logout button  */}
          <button
            className=" hidden tablet:flex desktop:flex text-danger w-[180px] font-semibold px-2 py-3 tablet:px-3 tablet:py-3 desktop:px-4 desktop:py-3 mt-8 rounded-3xl bg-danger-100 justify-center items-center gap-2 active:scale-110"
            onClick={logout}
          >
            <span>Logout</span>
            <span>
              <FiLogOut />
            </span>
          </button>
        </div>
        <div className="w-full tablet:w-3/4 desktop:w-3/4 px-2 mt-4 text-sm tablet:mt-0 desktop:mt-0 tablet:ml-4 tablet:px-0  desktop:px-10 relative">
          {/* My Profile */}
          {selection === 1 && <MyProfile user={user} setModalOpen={setShow} />}
          {selection === 2 && <MyAnnouncement uid={user?.uid} />}
          {selection === 3 && <MyFavorite uid={user?.uid} />}
          {selection === 4 && <MyCV uid={user?.uid} />}
          {/* Announcement */}
        </div>
      </div>
    </div>
  )
}

export default Profile
