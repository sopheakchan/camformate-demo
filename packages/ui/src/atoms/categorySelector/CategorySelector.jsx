import React, { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'

const CategorySelector = ({
  categoryName,
  handleChange,
  borderColor,
  setValue,
}) => {
  const router = useRouter()
  // const [focus, setFocus] = useState(false)
  const borderStyle = () => {
    return borderColor ? borderColor : 'focus:border-primary'
  }
  const handleClick = value => {
    // handleChange(value)
    setValue(value)
    router.query.PopularCategory = value
    router.push(router, undefined, {
      shallow: true,
    })
  }
  // console.log('Router', router)
  return (
    <div className="flex flex-col items-start ">
      <p className="pb-2 text-sm ">Popular category</p>
      <div className="flex flex-col justify-center ">
        {categoryName.map((item, index) => {
          // console.log(
          //   item.label,
          //   router.query.PopularCategory,
          //   item.label === router.query.PopularCategory,
          // )
          return (
            <button
              key={index}
              className={`px-2 py-2 text-md  border-b-2 border-transparent  ${
                item.label === router.query.PopularCategory && 'text-primary'
              }`}
              onClick={() => handleClick(item.label)}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

CategorySelector.propTypes = {
  categoryName: PropTypes.array,
  borderColor: PropTypes.string,
  setValue: PropTypes.func,
}

export default CategorySelector
