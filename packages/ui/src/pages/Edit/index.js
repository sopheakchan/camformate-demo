import { Formik, Form, useFormikContext } from 'formik'

import { useState } from 'react'
import { FloatingNavigation } from './components/FloatingNavigation'

//map
import 'mapbox-gl/dist/mapbox-gl.css'

// job initialValues
import {
  jobInitialValues,
  jobValidationSchema,
} from './schema/jobInitialValues'

import { scholarshipInitialValues } from './schema/scholarshipInitialValues'

// pages
import {
  PageOne,
  PageTwo,
  PageThree,
  PageFour,
  PageFive,
  PageSix,
} from './Pages'

import { Button, Alert } from '../../atoms'

import { BsArrowRight } from 'react-icons/bs'
import { useRouter } from 'next/router'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import {
  updateJob,
  updateScholarship,
} from '../../../../../apps/client/helper/services/FetchAPI'

export default function EditPage({ data }) {
  // user experience states
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [type, setType] = useState('')
  // initial values
  const router = useRouter()
  const { job_id, scholarship_id } = router.query
  const initialValues = job_id
    ? jobInitialValues(data?.data)
    : scholarshipInitialValues(data?.data)
  const { token } = useAuth()

  // handle submit function
  const handleSubmit = async data => {
    setLoading(true)
    if (job_id) {
      const file = data.file || null

      await updateJob(`/jobs/${job_id}`, data, file, token)
        .then(res => {
          if (res.status === 'success') {
            setMessage(res.message)
            setType('success')
            setShowAlert(true)
            setTimeout(() => {
              setShowAlert(false)
              router.push('/profile')
            }, [3000])
          } else {
            setMessage(res.message)
            setType('error')
            setShowAlert(true)
          }
        })
        .catch(err => {
          setMessage(err.message)
          setType('error')
          setShowAlert(true)
        })
    } else {
      const file = data.file || null

      await updateScholarship(
        `/scholarships/${scholarship_id}`,
        data,
        file,
        token,
      )
        .then(res => {
          if (res.status === 'success') {
            setMessage(res.message)
            setType('success')
            setShowAlert(true)
            setTimeout(() => {
              setShowAlert(false)
              router.push('/profile')
            }, [3000])
          } else {
            console.log(res)
            setMessage(res.message)
            setType('error')
            setShowAlert(true)
          }
        })
        .catch(err => {
          console.log(err)
          setMessage(err.message)
          setType('error')
          setShowAlert(true)
        })
    }
    setLoading(false)
  }

  return (
    <>
      <main className="max-w-[1200px] mx-auto p-6">
        <Alert
          show={showAlert}
          setShow={setShowAlert}
          message={message}
          type={type}
          closable={true}
          onClose={() => {
            setMessage('')
            setType('')
            setShowAlert(false)
          }}
        />
        <Formik
          initialValues={initialValues}
          // validationSchema={jobValidationSchema}
          onSubmit={e => {
            handleSubmit(e)
          }}
        >
          {({ values }) => <InnerForm values={values} loading={loading} />}
        </Formik>
      </main>
    </>
  )
}

const InnerForm = ({ values, loading }) => {
  const [selectedPage, setSelectedPage] = useState(0)
  const { errors } = useFormikContext()

  const date = values.date

  console.log(errors)

  return (
    <Form className="space-y-4 pb-16">
      <FloatingNavigation setPage={page => setSelectedPage(page)} />

      {selectedPage === 0 ? <PageOne values={values} /> : null}

      {/* Date & Time */}
      {selectedPage === 1 ? <PageTwo values={values} /> : null}

      {/* Location */}
      {selectedPage === 2 ? <PageThree values={values} /> : null}

      {/* Schedule */}
      {selectedPage === 3 ? <PageFour values={values} /> : null}

      {/* How to join */}
      {selectedPage === 4 ? <PageFive values={values} /> : null}

      {/* Dynamic Content */}
      {selectedPage === 5 ? <PageSix values={values} /> : null}

      <div className="flex justify-between">
        {selectedPage !== 0 ? (
          <button
            type="button"
            className="flex justify-center items-center gap-4 border rounded-2xl h-12 px-6 bg-white text-gray-500 border-primary-light"
            onClick={() => setSelectedPage(prev => prev - 1)}
          >
            <BsArrowRight className="text-md rotate-180" /> Previous
          </button>
        ) : null}
        {selectedPage < 5 ? (
          <button
            type="button"
            className="flex justify-center items-center gap-4 border rounded-2xl h-12 px-6 bg-white text-gray-500 border-primary-light"
            onClick={() => setSelectedPage(prev => prev + 1)}
          >
            Next <BsArrowRight className="text-md" />
          </button>
        ) : null}
      </div>

      {selectedPage === 5 ? (
        <Button
          type="submit"
          className="rounded-2xl h-14 px-12 shadow-md font-medium gradient-text bg-primary text-white active:scale-110 flex justify-center items-center gap-2 float-right"
          isSpinning={loading}
          spinColor="white"
        >
          Submit
        </Button>
      ) : null}
    </Form>
  )
}
