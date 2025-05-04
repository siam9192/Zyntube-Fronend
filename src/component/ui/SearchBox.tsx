import { useState } from "react"
import { LuSearch } from "react-icons/lu"


const SearchBox = () => {
  const [value,setValue] = useState('')
  return (
    <div className="w-1/3  md:flex items-center gap-2 px-4 py-3 bg-gray-100 rounded-full relative md:block hidden ">
      <span className="text-2xl text-gray-600">
      <LuSearch />
      </span>
          <input onChange={(e)=>setValue(e.target.value)} type="text" placeholder="Search.." className="w-full text-black  border-none outline-none " />
    </div>
  )
}

export default SearchBox