import React from 'react'
import { FormLabel, FormInput, Button } from '../../atoms'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import { MdContactSupport } from 'react-icons/md'

const Contact = () => {
  const { email, setEmail, web, setWeb, phone, setPhone } = useUpload()

  const handleChange = (index, e) => {
    const data = e.target.value
    const newArray = [...phone]
    newArray[index].value = data
    setPhone(newArray)
  }

  return (
    <div className="flex flex-col gap-8 mb-10 overflow-hidden">
      <div className="flex gap-2">
        <MdContactSupport className="text-lg" />
        <p className="text-lg font-bold">Contacts</p>
      </div>

      {/* phone number */}
      <div className="flex flex-col desktop:flex-row">
        <div className="w-screen desktop:w-1/2">
          <FormLabel title="Phone Number" subTitle="Atleast one phone number" />
        </div>
        <div className="w-screen desktop:w-1/2 flex flex-col gap-4">
          {/* loop phone number input field */}
          <div className="flex flex-col gap-2">
            {phone.map((val, index) => {
              return (
                <div className="w-full flex gap-4" key={index}>
                  <div className="flex w-[60%] tablet:w-[50%] desktop:w-[70%]">
                    <FormInput
                      placeholder="Your Phone Number"
                      border={false}
                      size="sm"
                      value={phone[index].value}
                      onChange={e => handleChange(index, e)}
                      className="w-[100%]"
                    />
                  </div>
                  {index + 1 === phone.length && phone.length !== 1 ? (
                    <Button
                      intent="danger"
                      onClick={() =>
                        setPhone(prev =>
                          prev.filter(phone => {
                            return phone.id !== prev.length
                          }),
                        )
                      }
                      className="w-[100px] h-[40px] rounded-lg"
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              )
            })}
          </div>
          {/* end-of-phone-input-field */}
          <div className="flex justify-end w-full pr-4 tablet:w-[60%] desktop:p-0 desktop:w-2/3">
            <Button
              className="w-[150px] h-[50px] rounded-lg hover:bg-transparent hover:border-black hover:text-black hover:border-2 ease-linear duration-200"
              intent="secondary"
              onClick={() =>
                setPhone(prev => [...prev, { id: phone.length + 1, value: '' }])
              }
            >
              Add
            </Button>
          </div>
        </div>
      </div>

      {/* gmail */}
      <div className="flex flex-col desktop:flex-row">
        <div className="w-screen desktop:w-1/2">
          <FormLabel title="Gmail" subTitle="Gmail is required" />
        </div>
        <div className="w-screen desktop:w-1/2">
          <FormInput
            type="email"
            border={false}
            size="sm"
            placeholder="e.g. example@gmail.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-[60%]  tablet:w-[50%] desktop:w-[70%]"
          />
        </div>
      </div>

      {/* web */}
      <div className="flex flex-col desktop:flex-row">
        <div className="w-screen desktop:w-1/2">
          <FormLabel title="Website or Social Media" subTitle="( Optional )" />
        </div>
        <div className="w-screen desktop:w-1/2">
          <FormInput
            type="text"
            border={false}
            size="sm"
            placeholder="e.g. www.example.com"
            value={web}
            onChange={e => setWeb(e.target.value)}
            className="w-[60%] tablet:w-[50%] desktop:w-[70%]"
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
