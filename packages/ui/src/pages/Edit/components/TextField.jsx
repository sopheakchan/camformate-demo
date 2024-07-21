import React from 'react'
import { useField } from 'formik'
import { Message } from './Message'

export const TextField = ({ label, name, type, placeholder }) => {
  const [field, meta] = useField({ name })

  return (
    <label className="flex flex-col space-y-2 w-full">
      {label ? <span className="text-base font-medium">{label}</span> : null}
      <textarea
        type={type}
        placeholder={placeholder}
        rows={10}
        {...field}
        className="resize-none border rounded-2xl p-4 border-gray-200 focus:border-gray-200 focus:ring focus:ring-primary focus:outline-none focus:ring-opacity-40"
      />
      {meta.error ? <Message variant="error">{meta.error}</Message> : null}
    </label>
  )
}
