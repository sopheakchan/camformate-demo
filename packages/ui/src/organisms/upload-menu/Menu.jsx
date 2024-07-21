import React from 'react'
import { Button } from '../../atoms'
import ActionButton from './ActionButton'

export const UploadMenu = ({ pagination = 1, setValue }) => {
  return (
    <>
      <div className="hidden tablet:flex desktop:flex flex-col w-[180px] gap-2 sticky top-[100px]">
        {pagination === 1 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Form Detail
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(1)}
          >
            Form Detail
          </div>
        )}

        {pagination === 2 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Upload Image
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(2)}
          >
            Upload Image
          </div>
        )}

        {pagination === 3 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Requirements
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(3)}
          >
            Requirements
          </div>
        )}

        {pagination === 4 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Benefits
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(4)}
          >
            Benefits
          </div>
        )}

        {pagination === 5 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Contact
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(5)}
          >
            Contact
          </div>
        )}

        {pagination === 6 ? (
          <Button intent="secondary" className="py-[15px] rounded-lg">
            Description
          </Button>
        ) : (
          <div
            className="bg-transparent py-[15px] cursor-pointer rounded-lg text-black hover:text-primary ease-linear duration-200"
            onClick={() => setValue(6)}
          >
            Description
          </div>
        )}
        <div className="mt-10"></div>

        <ActionButton pagination={pagination} setValue={setValue} />
      </div>
    </>
  )
}
