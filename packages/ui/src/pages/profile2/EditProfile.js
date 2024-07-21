import React, { useState } from 'react'
import { MyModal } from '../../organisms'
import { Button, FormInput } from '../../atoms'
import { fetchApi } from '../../../../../apps/client/helper/services/FetchAPI'
import { AiFillPlusCircle, AiFillDelete } from 'react-icons/ai'

const EditProfile = ({ show, setShow, user, setUser }) => {
  const [userData, setUserData] = useState(user)
  const [loading, setLoading] = useState(false)
  const [newPhoneNumber, setNewPhoneNumber] = useState(user?.contacts)

  const handleChangePhoneNumber = (e, index) => {
    const newContacts = newPhoneNumber
    newContacts[index].phone_number = e.target.value
    setUserData({ ...userData, contacts: newContacts })
  }

  const handleProfileChange = async () => {
    const id = userData?.id
    const data = {
      image: userData?.image,
      username: userData?.username,
      email: userData?.email,
      representation: userData?.representation,
      contacts: userData?.contacts,
    }

    setLoading(true)
    return await fetchApi(`/users/${id}`, 'PUT', data)
      .then(res => {
        setLoading(false)
        setShow(false)
        setUser(data)
        return res.json()
      })
      .catch(err => {
        setLoading(false)
        return err
      })
  }

  return (
    <MyModal show={show} onClose={() => setShow(false)}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <p className="text-primary font-bold">Username</p>
          <FormInput
            value={userData?.username}
            size="md"
            border={false}
            onChange={e =>
              setUserData({ ...userData, username: e.target.value })
            }
            className="outline-none"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-bold">Representation</p>
          <FormInput
            value={userData?.representation}
            size="md"
            border={false}
            onChange={e =>
              setUserData({ ...userData, representation: e.target.value })
            }
            className="outline-none"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-primary font-bold">Contacts</p>

          {/* phone number  */}
          {newPhoneNumber?.map((contact, index) => {
            return (
              <div className="w-full flex gap-4 items-center" key={index}>
                <div className="flex w-[60%] tablet:w-[50%] desktop:w-[70%]">
                  <FormInput
                    placeholder="Your Phone Number"
                    border={false}
                    size="sm"
                    value={contact.phone_number}
                    onChange={e => handleChangePhoneNumber(e, index)}
                    className="w-[100%]"
                  />
                </div>
                {index + 1 === newPhoneNumber.length &&
                newPhoneNumber?.length !== user?.contacts.length ? (
                  <div
                    onClick={() =>
                      setNewPhoneNumber(prev =>
                        prev.filter(phone => {
                          return phone.id !== prev.length
                        }),
                      )
                    }
                    className="w-[50px] h-[40px] rounded-lg bg-danger p-3 flex justify-center items-center cursor-pointer active:scale-110"
                  >
                    <AiFillDelete className="text-lg text-white" />
                  </div>
                ) : null}
              </div>
            )
          })}

          {/* add button  */}
          <div className="flex justify-end w-[70%] mt-2">
            <div
              className="w-[50px] py-2 rounded-lg bg-black flex justify-center items-center text-white gap-2 cursor-pointer active:scale-110"
              onClick={() =>
                setNewPhoneNumber(prev => [
                  ...prev,
                  { id: newPhoneNumber.length + 1, phone_number: '' },
                ])
              }
            >
              <AiFillPlusCircle className="text-lg text-white" />
            </div>
          </div>
        </div>

        {/* button  */}
        <div className="flex gap-4 justify-between">
          <Button
            className="rounded-lg h-[50px] w-1/2 text-black active:scale-110"
            variant="outlined"
            intent="secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg w-1/2 h-[50px] flex gap-2 items-center justify-center active:scale-110"
            onClick={handleProfileChange}
            isSpinning={loading}
            spinColor="white"
          >
            Confirm
          </Button>
        </div>
      </div>
    </MyModal>
  )
}

export default EditProfile
