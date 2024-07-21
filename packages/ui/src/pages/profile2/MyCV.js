import React, { useRef, useState, useEffect } from 'react'
import { Button, Spinner, Alert } from '../../atoms'
import { MyModal } from '../../organisms'
import { BsFillCloudUploadFill } from 'react-icons/bs'
import { GiMagnifyingGlass } from 'react-icons/gi'
import axios from 'axios'
import { BASE_URL } from '../../../../../apps/client/helper/services/FetchAPI'
import useAuth from '../../../../../apps/client/helper/hooks/auth'

const PDFViewer = ({ pdfUrl }) => {
  return (
    <>
      {pdfUrl ? (
        <iframe
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          frameBorder="0"
          allowFullScreen={true}
          loading="eager"
          className="rounded-xl w-[90%] h-[500px] tablet:w-[400px] tablet:h-[580px] desktop:w-[600px] desktop:h-[780px]"
        />
      ) : null}
    </>
  )
}

const MyCV = () => {
  const { uid, token } = useAuth()

  const inputRef = useRef(null)

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [alert, setAlert] = useState(false)
  const [pdfUrl, setPdfUrl] = useState('')

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

    setFile(fileObj)
  }

  // upload cv
  const uploadCV = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('CV', file)

    const response = await axios.post(`${BASE_URL}/users/${uid}/cv`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.data.status === 'Success') {
      setPdfUrl(response.data.data)
      setMessage(response.data.message)
      setType('success')
      setAlert(true)
    } else {
      setMessage('Upload Failed')
      setType('error')
      setAlert(true)
    }
    setFile(null)
    setLoading(false)
  }

  // update cv
  const updateCV = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('CV', file)

    const response = await axios.put(`${BASE_URL}/users/${uid}/cv`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    if (response.data.status === 'Success') {
      setPdfUrl(response.data.data)
      setMessage(response.data.message)
      setType('success')
      setAlert(true)
    } else {
      setMessage('Update Failed')
      setType('error')
      setAlert(true)
    }
    setFile(null)
    setLoading(false)
  }

  // fetch cv
  const getCV = async () => {
    setLoading(true)
    const response = await axios.get(`${BASE_URL}/users/${uid}/cv`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (response.data.status === 'Success') {
      setPdfUrl(response.data.data.cv_url)
    }
    setLoading(false)
  }

  useEffect(() => {
    getCV()
  }, [pdfUrl])

  return (
    <div className="flex flex-col gap-8 justify-center items-center mb-8">
      {/* alert  */}
      <Alert
        message={message}
        type={type}
        show={alert}
        setShow={setAlert}
        onClose={() => {
          setMessage('')
          setType('')
          setAlert(false)
        }}
        closable={true}
      />

      {/* choosing image  */}
      {file && (
        <MyModal show={true} onClose={() => setFile('')}>
          <div className="flex flex-col gap-8 items-center justify-center">
            <div className="group relative">
              <iframe
                src={URL.createObjectURL(file)}
                frameborder="0"
                allowFullScreen={true}
                loading="eager"
                className="rounded-xl w-full h-[450px]"
              />
            </div>
            <Button
              onClick={handleFileExploreOpen}
              icon={<GiMagnifyingGlass />}
              iconAppearance="text-primary text-lg"
              className="py-[15px] rounded-lg active:scale-110 bg-opacity-20 text-primary"
            >
              Choose another
            </Button>
            <div className="w-full flex gap-4 justify-between">
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
                onClick={pdfUrl ? updateCV : uploadCV}
                isSpinning={loading}
                spinColor="white"
              >
                Confirm
              </Button>
            </div>
          </div>
        </MyModal>
      )}

      {/* handle file explorer open  */}
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {pdfUrl ? (
        <Button
          onClick={handleFileExploreOpen}
          icon={<BsFillCloudUploadFill />}
          iconAppearance="text-gray-500 text-md"
          className="bg-gray-200 text-gray-500 bg-opacity-20 shadow-sm shadow-gray-200 py-[15px] px-[40px] rounded-xl active:scale-110"
        >
          Update CV
        </Button>
      ) : (
        <Button
          onClick={handleFileExploreOpen}
          icon={<BsFillCloudUploadFill />}
          iconAppearance="text-gray-500 text-md"
          className="bg-gray-200 text-gray-500 bg-opacity-20 shadow-sm shadow-gray-200 py-[15px] px-[40px] rounded-xl active:scale-110"
        >
          Upload CV
        </Button>
      )}

      {!pdfUrl ? (
        <div className="text-md text-gray-500 mt-8">
          You don&apos;t have any CV. Please upload one.
        </div>
      ) : null}

      {loading ? <Spinner /> : <PDFViewer pdfUrl={pdfUrl && pdfUrl} />}
    </div>
  )
}

export default MyCV
