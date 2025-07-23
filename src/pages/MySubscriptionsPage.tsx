import { useState } from "react"
import VideoLoadingCard from "../component/cards/VideoLoadingCard"

function MySubscriptionsPage() {
    const [active,setActive] = useState(0)
  return (
    <div>
        <h1 className="text-2xl md:text-3xl font-semibold  font-primary">My Subscriptions</h1>
      <div className="mt-5 md:mt-10 w-full overflow-x-auto hide-scrollbar">
  < div className="flex gap-5 w-max">
    {
      Array.from({ length: 32 }).map((_, index) => (
        <div onClick={()=>setActive(index)} key={index} className={`p-3 rounded-lg border-2 hover:cursor-pointer ${active === index ? 'border-primary bg-gray-50' :'border-secondary'} select-none `}>
          <img
            src="https://yt3.googleusercontent.com/aduvRrAka4iwQ3XD7XR3agLNl5Uwqs4sNCf50CCPJkbOTjiE18ZgFKPeom5ZDBincl57v29tMz4=s160-c-k-c0x00ffffff-no-rj"
            alt=""
            className=" size-20 md:size-24 rounded-full"
          />
          <p className=" mt-2 text-sm md:text-lg text-center line-clamp-1">Mr tripleR</p>
        </div>
      ))
    }
  </div>
</div>
 <div className=" mt-5 md:mt-8 lg:mt-10">
    <p className="text-xl font-semibold">From <span className="text-primary">Mr TripleR</span></p>
     <div className=" mt-3 md:mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
     {Array.from({ length: 20 }).map((video, index) => (
              <VideoLoadingCard key={index} />
            ))}
</div>
 </div>
    </div>
  )
}

export default MySubscriptionsPage