import React, { useState } from 'react'
import {
  UploadMenu,
  FormDetail,
  Typography,
  Shape,
  UploadImage,
  Requirement,
  Benefit,
  Contact,
  Description,
  Button,
  MobileActionButton,
} from 'ui'
import { withProtected } from '../../helper/hooks/route'
import { UploadProvider } from '../../helper/hooks/upload'

const Upload = () => {
  const [pagination, setPagination] = useState(1)

  const FormPage = () => {
    if (pagination === 1) return <FormDetail />
    else if (pagination === 2) return <UploadImage />
    else if (pagination === 3) return <Requirement />
    else if (pagination === 4) return <Benefit />
    else if (pagination === 5) return <Contact />
    else return <Description />
  }

  return (
    <UploadProvider>
      <div className="p-4 mt-4 tablet:p-2 desktop:p-0 max-w-[1200px] mx-auto tablet:mt-20 desktop:mt-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <Typography color="text-black" size="lg">
            Announcement Template Form
          </Typography>
          <Shape
            location="bottom"
            className="w-full h-[2px] opacity-10 bg-gray-500"
          ></Shape>
        </div>

        <div className="flex flex-col tablet:flex-row tablet:gap-16 tablet:p-4 desktop:flex-row">
          <div className="w-1/4">
            <UploadMenu pagination={pagination} setValue={setPagination} />
          </div>
          <div className="w-screen tablet:w-3/4 desktop:w-3/4">
            <FormPage />
          </div>
        </div>

        <div className="w-screen flex tablet:hidden desktop:hidden justify-center items-center pr-4">
          <MobileActionButton
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </div>
    </UploadProvider>
  )
}

export default withProtected(Upload)
