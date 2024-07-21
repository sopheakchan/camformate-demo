import React, { useEffect, useState } from 'react'
import JobCard from '../../../organisms/newJobCard/job2'
import { BASE_URL } from '../../../../../../apps/client/helper/services/FetchAPI'
import { JobSkeleton, MyModal } from '../../../organisms'
import { Button, Typography, Alert } from '../../../atoms'
import { useRouter } from 'next/router'
import { MdKeyboardArrowUp, MdDelete } from 'react-icons/md'
import { FiEdit2 } from 'react-icons/fi'
import useAuth from '../../../../../../apps/client/helper/hooks/auth'

// popup
const Popup = ({ popUp, setPopUp, handleModalOpen }) => {
  return (
    <div>
      <div
        className={`bg-primary rounded-full p-2 absolute ${
          popUp
            ? 'bottom-[60px] bg-opacity-100 text-white rotate-180'
            : '-bottom-[10px] bg-opacity-20 text-primary rotate-0'
        } right-0 cursor-pointer active:scale-110 z-10 duration-200`}
        onClick={() => setPopUp(!popUp)}
      >
        <MdKeyboardArrowUp className="text-md" />
      </div>
      <div
        className={`${
          popUp ? 'scale-y-100' : 'scale-y-0 translate-y-[50%]'
        } absolute -bottom-[20px] h-[100px] w-[250px] bg-white border-t-2 border-opacity-20 border-primary shadow-lg rounded-lg duration-200 flex gap-4 justify-center items-center`}
      >
        <div
          className="group p-2 rounded-lg bg-primary bg-opacity-10 cursor-pointer hover:px-4 ease-linear duration-200 flex justify-center items-center transition-all gap-2"
          onClick={() => handleModalOpen('edit')}
        >
          <FiEdit2 className="text-lg text-primary" />
          <div className="group-hover:flex hidden duration-200 text-black">
            Edit
          </div>
        </div>
        <div
          className="group p-2 rounded-lg bg-primary bg-opacity-10 cursor-pointer hover:px-4 ease-linear duration-200 flex justify-center items-center transition-all gap-2"
          // onClick={deletePost}
          onClick={() => handleModalOpen('delete')}
        >
          <MdDelete className="text-lg text-primary" />
          <div className="group-hover:flex hidden duration-200 text-black">
            Delete
          </div>
        </div>
      </div>
    </div>
  )
}

// job card component
const CardComponent = ({ item, index, setData, data }) => {
  const [popUp, setPopUp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [modal, setModal] = useState({
    show: false,
    type: '',
  })
  const { token } = useAuth()
  const router = useRouter()

  // delete function
  const deletePost = async () => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}/jobs/${item._id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      },
    })

    if (response) {
      const newData = data.filter((item, i) => i !== index)
      setData(newData)
      setMessage('Successfully Deleted')
      setShowAlert(true)
      setIsSuccess(true)
    } else {
      const newData = data.filter((item, i) => i !== index)
      setData(newData)
      setMessage('Something went wrong')
      setShowAlert(true)
      setIsSuccess(false)
    }
    setLoading(false)
    setModal({
      show: false,
      type: '',
    })
  }

  // modal handler
  const handleModalOpen = type => {
    setModal({ show: true, type: type })
  }

  // edit function
  const editPost = async () => {
    router.push(`/profile/jobs/${item._id}/edit`)
  }

  return (
    <div className="relative">
      {/* confirmation modal  */}
      <MyModal
        show={modal.show}
        onClose={() => setModal({ show: false, type: '' })}
      >
        <div className="flex flex-col gap-4">
          <div className="text-center text-md text-black font-semiBold">
            Are you sure you want to {modal.type} ?
          </div>
          <div className="flex gap-4 justify-center items-center">
            <Button
              className="rounded-lg text-black text-md active:scale-110"
              intent="secondary"
              variant="outlined"
              onClick={() => setModal({ show: false, type: '' })}
            >
              Cancel
            </Button>
            <Button
              className="rounded-lg flex gap-2 justify-center items-center border-2 border-primary active:scale-110"
              onClick={() => {
                modal.type === 'delete' ? deletePost() : editPost()
              }}
              isSpinning={loading}
              spinColor="white"
            >
              Confirm
            </Button>
          </div>
        </div>
      </MyModal>

      {/* alert  */}
      <Alert
        message={message}
        show={showAlert}
        setShow={setShowAlert}
        type={isSuccess ? 'success' : 'false'}
        closable={true}
        onClose={() => {
          setMessage('')
          setShowAlert(false)
          setIsSuccess(false)
        }}
      />

      <div className="relative w-[240px] h-[300px]">
        {/* job card  */}
        <JobCard allItems={item} />

        {/* button to show actions  */}
        <Popup
          popUp={popUp}
          setPopUp={setPopUp}
          handleModalOpen={handleModalOpen}
        />
      </div>
    </div>
  )
}

const JobAnnouncement = ({ uid }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const getJobs = async () => {
    setLoading(true)
    const response = await fetch(`${BASE_URL}/users/${uid}/jobs`)
    const jobs = await response.json()
    setLoading(false)
    return setData(jobs.jobs)
  }

  const SkeletonComponent = () => {
    return (
      <div className="flex flex-col gap-7  items-center justify-center tablet:grid  tablet:grid-cols-2  desktop:grid desktop:grid-cols-3 mt-8">
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
        <JobSkeleton />
      </div>
    )
  }

  useEffect(() => {
    getJobs()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {loading ? (
        <SkeletonComponent />
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="flex flex-col gap-10 items-center justify-center tablet:grid tablet:grid-cols-2 desktop:grid desktop:grid-cols-3 mt-8 mb-8">
              {data?.map((item, index) => {
                return (
                  <CardComponent
                    key={index}
                    item={item}
                    index={index}
                    setData={setData}
                    data={data}
                  />
                )
              })}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col gap-4 pt-20">
              <Typography>You don&apos;t have any announcements yet</Typography>
              <Button
                size="lg"
                className="active:scale-110"
                onClick={() => router.push('/upload')}
              >
                Create one now
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default JobAnnouncement
