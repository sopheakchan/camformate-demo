import React from 'react'
import { Field } from '../components/Field'
import { FaTrash } from 'react-icons/fa'
import { FieldArray } from 'formik'
import { MdContactSupport } from 'react-icons/md'
import { useRouter } from 'next/router'

const PageFive = ({ values }) => {
  const router = useRouter()
  const urlPath = router.pathname.split('/')[2]

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 mb-4 items-center">
        <span className="p-2 rounded-full bg-gray-500 bg-opacity-30">
          <MdContactSupport className="text-xl text-black" />
        </span>
        <span className="text-lg font-bold text-primary">Contact Info</span>
      </div>

      {/* phone numbers  */}
      {urlPath === 'jobs' ? (
        <FieldArray name="user_contacts">
          {({ insert, remove, push }) => (
            <div className="flex flex-col gap-4 w-full tablet:w-[90%] desktop:w-[80%] mx-auto">
              <span className="text-primary font-semibold">
                Contact Numbers
              </span>
              {values.user_contacts?.map((item, index) => {
                return (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="w-[85%] tablet:w-[90%] desktop:w-[850px]">
                      <Field
                        label={`Phone number ${index + 1}`}
                        name={`user_contacts.[${index}].contact`}
                        type="text"
                        placeholder="Your Phone number"
                      />
                    </div>
                    <span
                      className={`${
                        index + 1 === values.user_contacts?.length &&
                        values.user_contacts?.length != 1
                          ? 'flex'
                          : 'hidden'
                      } w-[30px] h-[30px] p-2 justify-center items-center rounded-lg bg-danger bg-opacity-80 cursor-pointer active:scale-110`}
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <FaTrash className="text-white text-lg" />
                    </span>
                  </div>
                )
              })}
              <div className="flex justify-end w-full desktop:w-[850px] select-none">
                <button
                  className="bg-primary bg-opacity-20 px-4 py-3 text-primary rounded-xl active:scale-110"
                  onClick={() => {
                    push({
                      id: values.user_contacts?.length + 1,
                      contact: '',
                    })
                  }}
                >
                  Add More
                </button>
              </div>
            </div>
          )}
        </FieldArray>
      ) : (
        <FieldArray name="phone_number">
          {({ insert, remove, push }) => (
            <div className="flex flex-col gap-4 w-full tablet:w-[90%] desktop:w-[80%] mx-auto">
              <span className="text-primary font-semibold">
                Contact Numbers
              </span>
              {values.phone_number?.map((item, index) => {
                return (
                  <div key={index} className="flex gap-4 items-end">
                    <div className="w-[85%] tablet:w-[90%] desktop:w-[850px]">
                      <Field
                        label={`Phone number ${index + 1}`}
                        name={`phone_number.[${index}]`}
                        type="text"
                        placeholder="Your Phone number"
                      />
                    </div>
                    <span
                      className={`${
                        index + 1 === values.phone_number?.length &&
                        values.phone_number?.length != 1
                          ? 'flex'
                          : 'hidden'
                      } w-[30px] h-[30px] p-2 justify-center items-center rounded-lg bg-danger bg-opacity-80 cursor-pointer active:scale-110`}
                      onClick={() => {
                        remove(index)
                      }}
                    >
                      <FaTrash className="text-white text-lg" />
                    </span>
                  </div>
                )
              })}
              <div className="flex justify-end w-full desktop:w-[850px] select-none">
                <button
                  className="bg-primary bg-opacity-20 px-4 py-3 text-primary rounded-xl active:scale-110"
                  onClick={() => {
                    push('')
                  }}
                >
                  Add More
                </button>
              </div>
            </div>
          )}
        </FieldArray>
      )}

      {/* email  */}
      <div className="w-full tablet:w-[90%] desktop:w-[80%] mx-auto">
        <span className="w-full desktop:w-[850px] flex flex-col gap-2">
          <span className="text-primary font-semibold">
            Email <span className="text-gray-500">( Optional )</span>
          </span>
          <Field
            name="email"
            type="email"
            placeholder="e.g. example@gmail.com"
          />
        </span>
      </div>

      {/* web  */}
      <div className="w-full tablet:w-[90%] desktop:w-[80%] mx-auto">
        <span className="w-full desktop:w-[850px] flex flex-col gap-2">
          <span className="text-primary font-semibold">
            Website <span className="text-gray-500">( Optional )</span>
          </span>
          <Field
            name="website"
            type="text"
            placeholder="e.g. www.example.com"
          />
        </span>
      </div>
    </div>
  )
}

export default PageFive
