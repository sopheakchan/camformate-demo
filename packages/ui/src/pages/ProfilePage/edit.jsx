import React, { useState } from 'react'
import { MyModal } from '../../organisms'
import { Button, FormInput } from '../../atoms'
import { fetchApi } from '../../../../../apps/client/helper/services/FetchAPI'

const EditProfile = ({ show, setShow, user }) => {
  const [userData, setUserData] = useState(user)
  const [loading, setLoading] = useState(false)

  const handleChangePhoneNumber = (e, index) => {
    const newContacts = userData?.contacts
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
      account_type: userData?.account_type,
      contacts: userData?.contacts,
    }

    setLoading(true)
    return await fetchApi(`/users/${id}`, 'PUT', data)
      .then(res => {
        setLoading(false)
        setShow(false)
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
          {userData?.contacts.map((contact, index) => {
            return (
              <FormInput
                key={index}
                value={contact.phone_number}
                size="md"
                border={false}
                onChange={e => handleChangePhoneNumber(e, index)}
                className="outline-none"
              />
            )
          })}
        </div>

        {/* button  */}
        <div className="flex gap-4 justify-between">
          <Button
            className="rounded-lg h-[50px] w-1/2 text-black"
            variant="outlined"
            intent="secondary"
            onClick={() => setShow(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-lg w-1/2 h-[50px] flex gap-2 items-center justify-center"
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
