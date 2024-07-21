import { useState } from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = ({ setSearch, className = 'w-[50%]' }) => {
  const [text, setText] = useState('')

  const handleInputSearch = event => {
    setText(event.target.value)
  }

  const handleSearch = event => {
    console.log(event)
    event.preventDefault()
    setSearch(text)
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="flex justify-center items-center">
        <div
          className={`${className} flex justify-between items-center rounded-full bg-gray-200 bg-opacity-20 border-[1px] border-gray-500 px-4 py-2`}
        >
          <input
            className="bg-transparent w-[95%] ml-2 outline-none"
            type="text"
            placeholder="Search"
            value={text}
            onChange={handleInputSearch}
          />
          <button type="submit">
            <BiSearch size={25} className="text-primary" />
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
