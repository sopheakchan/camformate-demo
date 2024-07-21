import React from 'react'
import { FormLabel, FormTextArea } from '../../atoms'
import useUpload from '../../../../../apps/client/helper/hooks/upload'

const Description = () => {
  const { des, setDes } = useUpload()

  return (
    <div className="flex flex-col gap-4">
      <FormLabel
        title="Description ( Optional )"
        subTitle="Describe the detail of your announcement or benefits for applicants"
      />
      <div className="flex w-[95%]">
        <FormTextArea
          size="description"
          placeholder="Up to 250 characters"
          value={des}
          maxLength={250}
          onChange={e => setDes(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Description
