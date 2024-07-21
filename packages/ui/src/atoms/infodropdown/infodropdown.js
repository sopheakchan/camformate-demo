const list = [
  {
    name: 'All',
  },
  {
    name: 'Takeo',
  },
  {
    name: 'Phnom Penh',
  },
  {
    name: 'Kompot',
  },
  {
    name: 'Kompong Speu',
  },
  {
    name: 'Battambong',
  },
  {
    name: 'Preah Sihanouk',
  },
  {
    name: 'Kompong Cham',
  },
  {
    name: 'Kep',
  },
  {
    name: 'Siem Reap',
  },
  {
    name: 'Kompong Thom',
  },
  {
    name: 'Prey Veng',
  },
  {
    name: 'Svay Rieng',
  },
  {
    name: 'Preah Sihanouk',
  },
  {
    name: 'Koh Kong',
  },
]

import React, { useState, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'

export default function DropdownInfo({ setLocationName, setSearch, location }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const locationHandler = location => {
    setIsOpen(false)
    setSearch('')
    setLocationName(location)
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownRef])
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="p-[1px] bg-gray-200 rounded-lg bg-opacity-20 border-[1px] border-gray-500"
      >
        {!isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="relative z-50">
          <Transition
            show={isOpen}
            enter="transition duration-700 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            appear={true}
          >
            <div className="absolute flex flex-col bg-white shadow items-start border-2 overflow-y-auto h-[250px] z-50 rounded-lg w-[170px] p-3">
              {/* Dropdown content */}
              {list.map(item => {
                return (
                  <div
                    key={item.name}
                    onClick={() => locationHandler(item.name)}
                    className={`cursor-pointer hover:bg-primary w-full hover:text-white  text-[16px] px-2.5 py-2 rounded-lg text-black font-serif ${
                      item.name === location
                        ? 'bg-primary text-white'
                        : 'bg-white'
                    }`}
                  >
                    {item.name}
                  </div>
                )
              })}
            </div>
          </Transition>
        </div>
      )}
    </div>
  )
}
