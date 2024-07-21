import React, { useEffect, useRef, useState } from 'react'
import { Images, SVGIcons } from '../../../../../apps/client/assets'
import Image from 'next/image'
import { Formik, Form } from 'formik'
import { FormController, Typography, Button } from '../../atoms'
import { logo } from '../../../assets'
import { useRouter } from 'next/router'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { Alert } from 'antd'
import Link from 'next/link'

const ForgotPassword = () => {
  const router = useRouter()
  const { forgotPassword, message, setMessage } = useAuth()
  const buttonRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    email: '',
  }

  const onSubmit = async values => {
    setLoading(true)
    if (values) {
      await forgotPassword(values.email)
        .then(() => console.log(message))
        .catch(err => setMessage(err))
    }
    setLoading(false)
  }

  useEffect(() => {
    const handleKeyPress = event => {
      if (event.keyCode === 13 && buttonRef.current) {
        buttonRef.current.click()
      }
    }

    document.addEventListener('keypress', handleKeyPress)

    return () => {
      document.removeEventListener('keypress', handleKeyPress)
    }
  }, [buttonRef])

  return (
    <div className="flex justify-center desktop:justify-start items-center h-screen">
      {message ? (
        <Alert
          message={message}
          type="success"
          closable
          className="fixed top-[20px] right-[20px]"
        />
      ) : (
        ''
      )}
      <div className="w-1/2 hidden desktop:block">
        <Image
          src={Images.AuthenticationImage}
          alt="Login Image"
          width="500"
          height="500"
          className="hidden desktop:block object-cover rounded-tr-3xl rounded-br-3xl w-11/12 aspect-square"
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-1/2 h-full">
        <div className="w-screen desktop:w-[500px] flex justify-center desktop:justify-start gap-4 items-center">
          <Link href="/">
            <Image
              src={logo}
              alt="Logo"
              width="50"
              height="50"
              onClick={() => router.push('/')}
            />
          </Link>
          <Typography color="text-gray-500">
            Ehh ! You Forgot Your Password ?
          </Typography>
        </div>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {formik => {
            return (
              <Form className="w-screen desktop:w-[500px] desktop:h-[600px] flex flex-col items-center justify-start gap-8 bg-white desktop:shadow-md desktop:drop-shadow-lg rounded-lg p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div>{SVGIcons.ForgotPasswordIcon()}</div>
                  <Typography color="text-gray-500" size="lg">
                    Forgot Password
                  </Typography>
                  <Typography color="text-gray-500" size="sm">
                    Enter your email to verify
                  </Typography>
                </div>

                <div>
                  <Image
                    src={Images.ForgotPasswordImage}
                    alt="Sad Image"
                    width="200"
                    height="200"
                  />
                </div>

                <div className="h-[70px]">
                  <FormController
                    control="input"
                    type="email"
                    name="email"
                    label="Enter your Email"
                    size="lg"
                    icon={SVGIcons.EmailIcon()}
                    placeholder="e.g. example@gmail.com"
                    className="w-[350px] tablet:w-[400px] desktop:w-[400px]"
                  />
                </div>
                <Button
                  className="w-[350px] tablet:w-[400px] desktop:w-[400px] rounded-lg h-[40px] hover:animate-pulse flex gap-2 justify-center items-center"
                  type="submit"
                  ref={buttonRef}
                  isSpinning={loading}
                  spinColor="white"
                >
                  Send Verification
                </Button>
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-primary ease-linear duration-200"
                >
                  Go to Login
                </Link>
              </Form>
            )
          }}
        </Formik>

        <Button
          className="py-[15px] w-[250px] rounded-lg active:scale-110 bg-gray-200 bg-opacity-20 border-[1px] border-gray-500 text-gray-500"
          onClick={() => router.push('/')}
        >
          Go to Homepage
        </Button>
      </div>
    </div>
  )
}

export default ForgotPassword
