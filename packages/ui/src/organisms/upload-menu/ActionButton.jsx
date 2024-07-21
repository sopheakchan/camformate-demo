import React, { useState } from 'react'
import { Button } from '../../atoms'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import {
  uploadJob,
  uploadScholarship,
} from '../../../../../apps/client/helper/services/FetchAPI'
import { MyModal } from '../Modal/modal'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { jobValidator } from './validateForm'
import { GrFormNextLink } from 'react-icons/gr'
import { AiOutlineCloudUpload, AiOutlineCloseCircle } from 'react-icons/ai'
import {
  jobValidationSchema,
  scholarshipValidationSchema,
} from '../../pages/Upload/schema'

const ActionButton = ({ pagination, setValue }) => {
  const [message, setMessage] = useState({
    show: false,
    text: '',
  })
  const [loading, setLoading] = useState(false)
  const { data, type, file } = useUpload()
  const { token } = useAuth()

  const handleUpload = async () => {
    const url = type === 'scholarship' ? '/scholarships' : '/jobs'

    if (type !== 'scholarship') {
      jobValidationSchema
        .validate({ ...data, file })
        .then(async data => {
          setLoading(true)
          await uploadJob(url, data, file, token)
            .then(response => {
              if (response.success == true) {
                setMessage({
                  show: true,
                  text: 'Successfully Uploaded',
                })
              } else {
                setMessage({
                  show: true,
                  text: 'Failed to upload',
                })
              }
            })
            .catch(err => {
              setMessage({
                show: true,
                text: 'Failed to upload',
              })
            })
          setLoading(false)
        })
        .catch(err =>
          setMessage({
            show: true,
            text: err.message,
          }),
        )
    } else {
      scholarshipValidationSchema
        .validate({ ...data, file })
        .then(async data => {
          setLoading(true)
          await uploadScholarship(url, data, file, token)
            .then(response => {
              if (response.success == true) {
                setMessage({
                  show: true,
                  text: 'Successfully Uploaded',
                })
              } else {
                setMessage({
                  show: true,
                  text: 'Failed to upload',
                })
              }
            })
            .catch(err => {
              setMessage({
                show: true,
                text: 'Failed to upload',
              })
            })
          setLoading(false)
        })
        .catch(err => {
          setMessage({
            show: true,
            text: err.message,
          })
        })
    }
  }

  return (
    <div>
      <MyModal
        show={message.show}
        onClose={() => setMessage({ show: false, text: '' })}
      >
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="text-gray-500">{message.text}</div>
          <Button
            className="w-[95%] rounded-lg"
            onClick={() => {
              setMessage({ show: false, text: '' })
            }}
          >
            Okay
          </Button>
        </div>
      </MyModal>

      {pagination === 6 ? (
        <div className="flex flex-row-reverse tablet:flex-col desktop:flex-col gap-4">
          <Button
            intent="secondary"
            className="py-[15px] rounded-lg w-full flex gap-2 justify-center items-center active:scale-110 border-2 border-black"
            onClick={handleUpload}
            isSpinning={loading}
            spinColor="white"
            icon={<AiOutlineCloudUpload />}
            iconAppearance="text-md"
            type="submit"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
          <Button
            variant="outlined"
            intent="secondary"
            className="py-[15px] rounded-lg w-full active:scale-110 flex gap-2 justify-center items-center"
            onClick={() => setValue(1)}
            icon={<AiOutlineCloseCircle />}
            iconAppearance="text-md"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button
            intent="secondary"
            variant="outlined"
            className="py-[15px] rounded-lg w-full active:scale-110 text-black"
            onClick={() => setValue(pagination - 1)}
            icon={<GrFormNextLink />}
            iconAppearance="text-md rounded-full rotate-180"
          >
            Previous
          </Button>
          <Button
            intent="secondary"
            className="py-[15px] rounded-lg w-full active:scale-110 text-white"
            onClick={() => setValue(pagination + 1)}
            icon={<GrFormNextLink />}
            iconAppearance="bg-white text-md rounded-full"
            reverse={true}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

export default ActionButton
