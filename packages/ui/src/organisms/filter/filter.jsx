import { Form, Formik } from 'formik'
import PropTypes, { object } from 'prop-types'
import React from 'react'
import { InputField } from '../../atoms'
import { Button } from '../../atoms'
import { useRouter } from 'next/router'

export const Filter = ({ items, initialValues, className }) => {
  const notEmpty = obj => {
    const data = Object.entries(obj).filter(([key, value]) => {
      return value !== ''
    })

    return Object.fromEntries(data)
  }
  const router = useRouter()
  const onSubmit = values => {
    console.log('Form data: ', values)

    router.push({ query: notEmpty(values) }, undefined, { shallow: true })
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {formik => {
        return (
          <Form
            className={`w-[90%] flex flex-col  desktop:flex-row gap-2 justify-between bg-white desktop:border-2 border-gray-500 rounded-lg ${className}`}
          >
            {items.map((val, key) => {
              return (
                <div key={key} className="">
                  <InputField
                    type="text"
                    placeholder={val.placeholder}
                    name={val.name}
                    id={val.name}
                    icon={val.icon}
                    className={
                      key !== items.length - 1
                        ? 'mb-3 border-l-2  desktop:mb-0  desktop:border-l-0  desktop:border-r-2 border-gray-500 h-full'
                        : 'mb-3 border-l-2 border-gray-500  desktop:mb-0 desktop:border-none'
                    }
                  />
                </div>
              )
            })}

            <Button
              type="submit"
              intent="secondary"
              size="lg"
              className=" desktop:rounded-tl-none desktop:rounded-bl-none"
            >
              Search
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

Filter.propTypes = {
  items: PropTypes.arrayOf(object),
  className: PropTypes.string,
}
