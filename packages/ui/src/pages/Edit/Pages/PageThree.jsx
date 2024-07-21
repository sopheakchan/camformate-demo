import React from 'react'
import { Field } from '../components/Field'
import { FaTrash } from 'react-icons/fa'
import { FieldArray } from 'formik'
import { AiOutlineExclamationCircle } from 'react-icons/ai'

const PageThree = ({ values }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 mb-4 items-center">
        <span className="p-2 rounded-full bg-gray-500 bg-opacity-30">
          <AiOutlineExclamationCircle className="text-xl text-black" />
        </span>
        <span className="text-lg font-bold text-primary">Requirements</span>
      </div>
      <FieldArray name="requirements">
        {({ insert, remove, push }) => (
          <div className="flex flex-col gap-4 w-full tablet:w-[90%] desktop:w-[80%] mx-auto">
            {values.requirements?.map((item, index) => {
              return (
                <div key={index} className="flex gap-4 items-end">
                  <div className="w-[85%] tablet:w-[90%] desktop:w-[850px]">
                    <Field
                      label={`Requirement ${index + 1}`}
                      name={`requirements.[${index}].requirement`}
                      type="text"
                      placeholder="Your requirement"
                    />
                  </div>
                  <span
                    className={`${
                      index + 1 === values.requirements?.length &&
                      values.requirements?.length != 1
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
                    id: values.requirements.length + 1,
                    requirement: '',
                  })
                }}
              >
                Add Requirement
              </button>
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  )
}

export default PageThree
