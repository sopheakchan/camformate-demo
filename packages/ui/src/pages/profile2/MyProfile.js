import React from 'react'
import { HiOutlinePencil } from 'react-icons/hi'

const MyProfile = ({ user, setModalOpen }) => {
  return (
    <div>
      <div className="flex px-7 flex-col  desktop:grid desktop:grid-cols-2 gap-9 border-2 rounded-2xl p-5 border-gray-100 relative">
        <div>
          <div className=" text-gray-500 text-sm mb-3">Email</div>
          <div className="text-semibold text-[16px]">{user?.email}</div>
        </div>
        <div>
          <div className="text-gray-500 text-sm mb-3">Contact</div>
          <div className="flex flex-col gap-2">
            {user?.contacts.map((contact, index) => {
              return (
                <div className="text-semibold text-[16px]" key={index}>
                  {contact.phone_number}
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <div className=" text-gray-500 text-sm mb-3">Representation</div>
          <div className="text-semibold text-[16px]">
            {user?.representation}
          </div>
        </div>
        {/* <div>
          <div className=" text-gray-500 text-sm mb-3">Account Type</div>
          <div className="text-semibold text-[16px]">{user?.account_type}</div>
        </div> */}

        {/* edit handler  */}
        <div
          className="flex absolute top-[15px] right-3 text-gray-500 gap-1 mt-2 cursor-pointer hover:bg-primary hover:bg-opacity-10 hover:text-primary ease-linear duration-200 hover:p-3 rounded-lg"
          onClick={() => setModalOpen(true)}
        >
          <span>Edit</span>
          <HiOutlinePencil />
        </div>
      </div>
    </div>
  )
}

export default MyProfile
