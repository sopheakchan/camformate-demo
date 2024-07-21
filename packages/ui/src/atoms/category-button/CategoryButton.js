import React from 'react'

const CategoryButton = ({ category, onClick, className }) => {
  return (
    <button onClick={onClick} className={`${className} `}>
      {category}
    </button>
  )
}

export default CategoryButton
