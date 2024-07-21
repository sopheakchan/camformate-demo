import React, { useState } from 'react'
import { Button } from '../../atoms'
import { MyModal } from '../Modal/modal'
import { GrFormNextLink } from 'react-icons/gr'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import {
  jobValidationSchema,
  scholarshipValidationSchema,
} from '../../pages/Upload/schema'
import {
  uploadJob,
  uploadScholarship,
} from '../../../../../apps/client/helper/services/FetchAPI'

export const MobileActionButton = ({ pagination, setPagination }) => {
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
        <div className="w-screen flex flex-col gap-4 justify-center items-center">
          <Button
            size="lg"
            intent="secondary"
            variant="outlined"
            className="w-[95%] py-[12px] flex justify-center items-center"
            onClick={() => setPagination(1)}
          >
            Cancel
          </Button>
          <Button
            size="lg"
            intent="secondary"
            className="w-[95%] py-[12px] flex gap-2 justify-center items-center"
            onClick={handleUpload}
            isSpinning={loading}
            spinColor="white"
          >
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2 w-screen justify-center items-center">
          <Button
            size="lg"
            intent="secondary"
            variant="outlined"
            className="w-[95%] py-[12px] flex justify-center items-center"
            onClick={() => setPagination(pagination - 1)}
            icon={<GrFormNextLink />}
            iconAppearance="text-lg rotate-180"
          >
            Previous
          </Button>
          <Button
            size="lg"
            intent="secondary"
            className="w-[95%] py-[12px] flex justify-center items-center"
            onClick={() => setPagination(pagination + 1)}
            icon={<GrFormNextLink />}
            iconAppearance="bg-white text-lg rounded-full"
            reverse={true}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
