import React from 'react'
import { FormLabel, FormTextArea, Button } from '../../atoms'
import { SVGIcons } from '../../../../../apps/client/assets/SVG'
import useUpload from '../../../../../apps/client/helper/hooks/upload'

const Requirement = () => {
  const { require, setRequire } = useUpload()

  const handleChange = (index, e) => {
    const data = e.target.value
    const newArray = [...require]
    newArray[index].requirement = data
    setRequire(newArray)
  }

  return (
    <div className="flex flex-col gap-8 mb-10">
      <div className="flex justify-between">
        <FormLabel
          title="Requirements"
          subTitle="Requirements for your company or school"
        />
      </div>
      <div className="flex flex-col gap-4">
        {require.map((val, index) => {
          return (
            <div className="flex items-center gap-4" key={index}>
              <div className="flex w-[80%] desktop:w-2/3">
                <FormTextArea
                  size="requirement"
                  placeholder="Your requirement"
                  value={require[index].requirement}
                  onChange={e => handleChange(index, e)}
                />
              </div>
              {index + 1 === require.length && require.length > 1 ? (
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setRequire(prev =>
                      prev.filter(require => {
                        return require.id !== prev.length
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
            setRequire(prev => [
              ...prev,
              { id: require.length + 1, requirement: '' },
            ])
          }
        >
          Add
        </Button>
      </div>
    </div>
  )
}

export default Requirement
