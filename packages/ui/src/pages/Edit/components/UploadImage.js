import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { AiOutlineCamera } from 'react-icons/ai'
import { IoImageOutline } from 'react-icons/io5'
import { BsCloudUpload } from 'react-icons/bs'
import { useField } from 'formik'

const UploadImage = ({ imageSrc, name }) => {
  const inputRef = useRef(null)
  const [image, setImage] = useState(imageSrc)
  const [_, meta, helpers] = useField(name)

  const handleFileExploreOpen = () => {
    inputRef.current.click()
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    helpers.setValue(fileObj)
    const reader = new FileReader(fileObj)
    reader.onload = event => {
      setImage(event.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <>
      <div className="w-full tablet:w-[95%] desktop:w-2/3 tablet:h-[350px] desktop:h-[350px] border-[1px] border-gray-200 rounded-lg flex flex-col justify-center items-center gap-20 relative bg-gray-200 bg-opacity-20">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg, image/png"
        />
        {imageSrc ? (
          <div className="group h-full w-full">
            <Image
              src={image}
              alt="upload_image"
              width={800}
              height={800}
              quality={100}
              className="w-full h-full object-cover rounded-lg"
            />
            <div
              className="hidden group-hover:flex absolute right-0 left-0 top-0 bottom-0 bg-gray-500 bg-opacity-50 justify-center items-center text-white gap-2 cursor-pointer rounded-lg"
              onClick={handleFileExploreOpen}
            >
              Choose Image <AiOutlineCamera className="text-lg" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center items-center">
            <IoImageOutline className="text-xxl text-gray-500 opacity-50" />
            <span
              className="font-semibold px-4 py-2 bg-gray-200 bg-opacity-10 rounded-lg border-[1px] border-gray-500 active:scale-110 cursor-pointer flex gap-2 justify-center items-center text-gray-500"
              onClick={handleFileExploreOpen}
            >
              Upload Image
              <BsCloudUpload className="text-lg" />
            </span>
          </div>
        )}
      </div>
    </>
  )
}

export default UploadImage
