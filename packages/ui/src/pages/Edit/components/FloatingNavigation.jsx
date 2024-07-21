import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { AiOutlineBars, AiFillHeart, AiTwotonePhone } from 'react-icons/ai'
import { FcViewDetails } from 'react-icons/fc'
import { GiBarbedStar } from 'react-icons/gi'
import { FiMap } from 'react-icons/fi'
import { BsLayoutTextWindowReverse } from 'react-icons/bs'

const items = [
  {
    page: 0,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#06b6d4] bg-opacity-20">
          <FcViewDetails className="w-6 h-6" />
        </span>
        <span>Detail Information</span>
      </>
    ),
  },
  {
    page: 1,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#ec4899] bg-opacity-20">
          <FiMap className="w-6 h-6 text-[#ec4899]" />
        </span>
        <span>Location</span>
      </>
    ),
  },
  {
    page: 2,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#eab308] bg-opacity-20">
          <GiBarbedStar className="w-6 h-6 text-[#eab308] animate-spin" />
        </span>
        <span>Requirements</span>
      </>
    ),
  },
  {
    page: 3,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#f43f5e] bg-opacity-20">
          <AiFillHeart className="w-6 h-6 text-[#f43f5e]" />
        </span>
        <span className="space-x-2">
          <span>Benefits</span>
        </span>
      </>
    ),
  },
  {
    page: 4,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#22c55e] bg-opacity-20">
          <AiTwotonePhone className="w-6 h-6 text-[#22c55e]" />
        </span>
        <span>Contacts</span>
      </>
    ),
  },
  {
    page: 5,
    element: (
      <>
        <span className="p-2 rounded-full bg-[#8b5cf6] bg-opacity-20">
          <BsLayoutTextWindowReverse className="w-6 h-6 text-[#8b5cf6]" />
        </span>
        <span className="space-x-2">
          <span>Description</span>
          <span className="text-gray-500">( Optional )</span>
        </span>
      </>
    ),
  },
]

export const FloatingNavigation = ({ setPage }) => {
  return (
    <div className="flex justify-end">
      <Menu
        as="div"
        className="fixed bottom-4 right-[20px] tablet:bottom-[50px] tablet:right-[100px] desktop:right-[200px] flex justify-end items-end z-20"
      >
        <Menu.Button
          type="button"
          className="flex justify-center items-center rounded-full bg-primary bg-opacity-80 h-14 w-14 shadow font-medium text-primary focus:outline-none"
        >
          <AiOutlineBars className="w-6 h-6 text-white" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full right-0 mb-2 w-screen max-w-xs shadow-md divide-y divide-gray-100 rounded-xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    type="button"
                    className={`${
                      active ? 'bg-gray-50' : 'text-gray-700'
                    } px-4 py-2 w-full font-medium flex items-center rounded-lg space-x-4`}
                    onClick={() => setPage(item.page)}
                  >
                    {item.element}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
