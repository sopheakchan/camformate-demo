import React, { useState, useEffect, useRef } from 'react'
import { Formik, Form } from 'formik'
import { FormController, Button, Typography, Spinner } from '../../atoms'
import { validationSignInSchema } from './schema'
import { SVGIcons } from '../../../../../apps/client/assets'
import Link from 'next/link'
import Image from 'next/image'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { Images } from '../../../../../apps/client/assets'
import { Alert, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

export const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const { signupWithGoogle, createUserWithEmailAndPassword, error, setError } =
    useAuth()
  const buttonRef = useRef(null)

  // submit function when submit is clicked
  const onSubmit = values => {
    setLoading(true)
    if (values) {
      const data = {
        username: values.username,
        email: values.email,
        password: values.password,
      }
      createUserWithEmailAndPassword(data)
    } else {
      console.log(values)
    }
    setLoading(false)
  }

  // login with google
  const handlerGoogleLogin = async () => {
    setLoading(true)
    await signupWithGoogle()
    setLoading(false)
  }

  // initial values for formik
  const initialValues = {
    username: '',
    email: '',
    password: '',
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSignInSchema}
      onSubmit={onSubmit}
    >
      {formik => {
        return (
          <>
            {/* spinner loading   */}
            {loading ? (
              <Spin
                tip="Loading"
                size="large"
                className="rounded-lg bg-primary bg-opacity-20 py-4 px-6 fixed top-[50%] left-[50%] -ml-[35px] -mt-[35px] w-[70px] h-[70px] font-semibold text-primary flex flex-col gap-2 justify-center items-center"
                indicator={<LoadingOutlined />}
              ></Spin>
            ) : null}

            {/* error alert when error occured */}
            {error ? (
              <Alert
                message="Error"
                description="The email is already in use"
                type="error"
                closable
                className="absolute top-[10px] right-[10px] w-[95%] tablet:w-[400px] desktop:w-[400px]"
                onClose={() => setError('')}
              />
            ) : (
              ''
            )}

            {/* signup form */}
            <Form className="w-screen desktop:w-[500px] flex flex-col items-center justify-center gap-6 bg-white desktop:shadow-md desktop:drop-shadow-lg rounded-lg p-6">
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="flex flex-col gap-4 justify-center">
                  <div className="flex justify-center items-center">
                    {SVGIcons.ShieldIcon()}
                  </div>
                  <Typography
                    size="lg"
                    color="text-gray"
                    className="text-center"
                  >
                    Create Your Account
                  </Typography>
                  <Typography size="xs" color="text-gray-500">
                    Get started by just filling your information
                  </Typography>
                </div>

                <div className="h-[70px]">
                  <FormController
                    control="input"
                    type="text"
                    label="Username"
                    name="username"
                    placeholder="5 characters long"
                    icon={SVGIcons.LoginIcon()}
                    className="fill-primary w-[350px] tablet:w-[400px] desktop:w-[400px]"
                  />
                </div>

                <div className="h-[70px]">
                  <FormController
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                    placeholder="e.g. example@example.com"
                    icon={SVGIcons.EmailIcon()}
                    className="w-[350px] tablet:w-[400px] desktop:w-[400px]"
                  />
                </div>

                <div className="h-[70px]">
                  <FormController
                    control="input"
                    type="password"
                    label="Password"
                    name="password"
                    placeholder="5 characters long"
                    icon={SVGIcons.PasswordIcon()}
                    className="w-[350px] tablet:w-[400px] desktop:w-[400px]"
                  />
                </div>

                <div className="flex gap-4 ">
                  <input type="checkbox" />
                  <Typography size="xs" color="text-gray-500">
                    I read and agree to Term & Conditions
                  </Typography>
                </div>

                <Button
                  ref={buttonRef}
                  type="submit"
                  size="lg"
                  className="mt-2 tablet:ml-1 tablet:mt-0 rounded-md hover:animate-pulse w-[350px] tablet:w-[400px] desktop:w-[400px] flex gap-2 justify-center items-center"
                >
                  Sign Up
                </Button>

                {/* google login */}
                <div className="flex gap-4 justify-center items-center">
                  <div
                    className="p-1 border-gray-500 border-[1px] border-opacity-70 flex justify-center items-center gap-4 rounded-full bg-white w-[350px] tablet:w-[400px] desktop:w-[400px] select-none cursor-pointer"
                    onClick={handlerGoogleLogin}
                  >
                    <Image
                      src={Images.Google}
                      alt="Google"
                      width="30"
                      height="30"
                    />
                    <span className="text-gray-500">Continue with Google</span>
                  </div>
                </div>

                <div className="w-[400px] flex justify-center items-center gap-2">
                  Already have an account ?
                  <Link href="/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </div>
            </Form>
          </>
        )
      }}
    </Formik>
  )
}
