import React from 'react'
import { FormLabel, FormTextArea, Button } from '../../atoms'
import { SVGIcons } from '../../../../../apps/client/assets/SVG'
import useUpload from '../../../../../apps/client/helper/hooks/upload'

const Benefit = () => {
  const { benefit, setBenefit } = useUpload()

  const handleChange = (index, e) => {
    const data = e.target.value
    const newArray = [...benefit]
    newArray[index].benefit = data
    setBenefit(newArray)
  }

  return (
    <div className="flex flex-col gap-8 mb-10">
      <div className="flex justify-between">
        <FormLabel title="Benefits" subTitle="Benefits for applicants" />
      </div>
      <div className="flex flex-col gap-4">
        {benefit.map((val, index) => {
          return (
            <div className="flex items-center gap-4" key={index}>
              <div className="flex w-[80%] desktop:w-2/3">
                <FormTextArea
                  size="requirement"
                  placeholder="e.g. Lunch Fee"
                  value={benefit[index].benefit}
                  onChange={e => handleChange(index, e)}
                />
              </div>
              {index + 1 === benefit.length && benefit.length > 1 ? (
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setBenefit(prev =>
                      prev.filter(benefit => {
                        return benefit.id !== prev.length
                      }),
                    )
                  }
                >
                  {SVGIcons.TrashIcon()}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
      <div>
        <Button
          className="w-[150px] h-[50px] rounded-lg hover:bg-transparent hover:border-black hover:text-black hover:border-2 ease-linear duration-200"
          intent="secondary"
          onClick={() =>
            setBenefit(prev => [
              ...prev,
              { id: benefit.length + 1, benefit: '' },
            ])
          }
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default Benefit
