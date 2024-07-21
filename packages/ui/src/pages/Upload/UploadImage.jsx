import React from 'react'
import { FormLabel } from '../../atoms'
import { SVGIcons } from '../../../../../apps/client/assets/SVG'
import useUpload from '../../../../../apps/client/helper/hooks/upload'
import Image from 'next/image'
import { AiOutlineCamera } from 'react-icons/ai'

const UploadImage = () => {
  const { inputRef, file, setFile, image, setImage } = useUpload()

  const handleFileExploreOpen = () => {
    inputRef.current.click()
  }

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0]
    if (!fileObj) {
      return
    }
    setFile(fileObj)
    const reader = new FileReader(fileObj)
    reader.onload = event => {
      setImage(event.target.result)
    }
    reader.readAsDataURL(event.target.files[0])
  }

  const ImageContent = () => {
    return (
      <div className="group h-full">
        <Image
          src={image}
          alt="upload_image"
          width={200}
          height={200}
          quality={100}
          className="w-full h-full object-contain"
        />
        <div className="hidden group-hover:flex absolute right-0 left-0 top-0 bottom-0 bg-gray-500 bg-opacity-50 justify-center items-center text-white gap-2 cursor-pointer">
          Choose Image <AiOutlineCamera className="text-lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <FormLabel
        title="Upload Image"
        subTitle="Please upload your announcement image"
      />
      <div className="flex">
        <div
          className="w-[95%] desktop:w-2/3 h-[350px] border-2 border-black rounded-lg flex flex-col justify-center items-center gap-20 relative cursor-pointer"
          onClick={handleFileExploreOpen}
        >
          <input
            type="file"
            ref={inputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/jpeg, image/png"
          />
          {image ? (
            <ImageContent />
          ) : (
            <>
              <div>{SVGIcons.ImageIcon()}</div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UploadImage
