import React, { useEffect, useRef, useState } from 'react'
import { Images, SVGIcons } from '../../../../../apps/client/assets'
import Image from 'next/image'
import { Formik, Form } from 'formik'
import { FormController, Typography, Button, Spinner } from '../../atoms'
import { validationSignInSchema } from './schema'
import Link from 'next/link'
import { logo } from '../../../assets/'
import { useRouter } from 'next/router'
import useAuth from '../../../../../apps/client/helper/hooks/auth'
import { Alert } from 'antd'

const Login = () => {
  const { loginWithGoogle, loginWithEmailAndPassword, error, user, setError } =
    useAuth()
  const initialValues = {
    email: '',
    password: '',
  }
  const [loading, setLoading] = useState(false)
  const buttonRef = useRef(null)

  const router = useRouter()

  const onSubmit = values => {
    setLoading(true)
    if (values) {
      loginWithEmailAndPassword(values)
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
    <div className="flex justify-center desktop:justify-start items-center h-screen overflow-hidden">
      {/* spinner loading   */}
      {loading ? <Spinner /> : null}

      {error ? (
        <Alert
          message="Error"
          description="Email/Password is invalid or User does not exist"
          type="error"
          closable
          className="absolute top-[10px] right-[10px] w-[95%] tablet:w-[400px] desktop:w-[400px]"
          onClose={() => setError('')}
        />
      ) : (
        ''
      )}
      <div className="w-1/2 hidden desktop:block">
        <Image
          src={Images.AuthenticationImage}
          alt="Login Image"
          width={500}
          height={500}
          className="hidden desktop:block object-cover rounded-tr-3xl rounded-br-3xl w-11/12 aspect-square"
        />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center w-full tablet:w-1/2 desktop:w-1/2 h-full">
        <div className="w-screen desktop:w-[500px] flex justify-center desktop:justify-start gap-4 items-center">
          <Link href="/">
            <Image src={logo} alt="Logo" width="50" height="50" />
          </Link>
          <Typography color="text-gray-500">
            Welcome Back, My Dear User !
          </Typography>
        </div>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSignInSchema}
        >
          {formik => {
            return (
              <Form className="w-screen desktop:w-[500px] desktop:h-[600px] flex flex-col items-center justify-center gap-8 bg-white desktop:shadow-md desktop:drop-shadow-lg rounded-lg p-4">
                <div className="flex flex-col justify-center items-center gap-4">
                  <div>{SVGIcons.ShieldIcon()}</div>
                  <Typography color="text-gray-500" size="lg">
                    Login
                  </Typography>
                  <Typography color="text-gray-500" size="sm">
                    Get interacted with us
                  </Typography>
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
                    className={`w-[350px] tablet:w-[400px] desktop:w-[400px] ${
                      error ? 'border-danger-400 border-2' : ''
                    }`}
                  />
                </div>
                <div className="h-[70px]">
                  <FormController
                    control="input"
                    type="password"
                    name="password"
                    label="Enter your password"
                    size="lg"
                    icon={SVGIcons.PasswordIcon()}
                    placeholder="Password here"
                    className={`w-[350px] tablet:w-[400px] desktop:w-[400px] ${
                      error ? 'border-danger-400 border-2' : ''
                    }`}
                  />
                </div>
                <Link
                  href="/forgot_password"
                  className="text-gray-500 hover:text-primary ease-linear duration-200"
                >
                  Forgot password ?
                </Link>
                <Button
                  ref={buttonRef}
                  size="lg"
                  className="w-[350px] tablet:w-[400px] desktop:w-[400px] rounded-lg h-[40px] hover:animate-pulse active:scale-110 flex gap-2 justify-center items-center"
                  type="submit"
                  isSpinning={loading}
                  spinColor="white"
                >
                  Login
                </Button>

                {/* google login */}
                <div className="flex gap-4 justify-center items-center">
                  <div
                    className="p-1 border-gray-500 border-[1px] border-opacity-70 flex justify-center items-center gap-4 rounded-full bg-white w-[350px] tablet:w-[400px] desktop:w-[400px] select-none cursor-pointer"
                    onClick={() => {
                      setLoading(true)
                      loginWithGoogle()
                      setLoading(false)
                    }}
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
                  Do not have an account ?{' '}
                  <Link href="signup" className="text-primary">
                    Create one
                  </Link>
                </div>
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

export default Login
