import { PiThumbsDownLight, PiThumbsUpLight } from 'react-icons/pi'
import SynchronizedAreaChart from '../../component/charts/SynchronizedAreaChart'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import CustomShapeBarChart from '../../component/charts/CustomShapeBarChart'

const ChannelAnalysis = () => {
  return (
    <div>
    <h1 className='md:text-3xl text-2xl text-black font-semibold font-primary'>
    Channel Analysis
    </h1>
    <div className=' mt-10 grid grid-cols-4  gap-4  '>
      <div className='p-3 border-2 border-gray-600/10 rounded-md  min-h-32 flex justify-center items-center flex-col '>
        <h1 className='text-center text-4xl font-medium text-secondary'>{(234545).toLocaleString()}</h1>
        <p className='mt-2 text-center text-gray-800 font-medium  text-sm'>
         Videos
        </p>
      </div>
      <div className='p-3 border-2 border-gray-600/10 rounded-md  min-h-32 flex justify-center items-center flex-col '>
        <h1 className='text-center text-4xl font-medium text-secondary'>{(234545).toLocaleString()}</h1>
        <p className='mt-2 text-center text-gray-800 font-medium  text-sm'>
        Subscribers
        </p>
      </div>
      <div className='p-3 border-2 border-gray-600/10 rounded-md  min-h-32 flex justify-center items-center flex-col '>
        <h1 className='text-center text-4xl font-medium text-secondary'>{(234545).toLocaleString()}</h1>
        <p className='mt-2 text-center text-gray-800 font-medium  text-sm'>
        Watch time
        </p>
      </div>
      <div className='p-3 border-2 border-gray-600/10 rounded-md  min-h-32 flex justify-center items-center flex-col '>
        <h1 className='text-center text-4xl font-medium text-secondary'>{(234545).toLocaleString()}</h1>
        <p className='mt-2 text-center text-gray-800 font-medium  text-sm'>
          Revenue
        </p>
      </div>
   
     </div>

    <div className='mt-10 grid grid-cols-1 lg:grid-cols-6  gap-5 '>
     <div className='p-5 lg:col-span-4 border-2  border-pink-100 rounded-md'>
      <h2 className='text-2xl text-black font-primary font-medium mb-5'>
       Last 30 days views
      </h2>
     <SynchronizedAreaChart/>
     </div>
     <div className='col-span-2 border-2  border-pink-100 rounded-md p-5'>
     <h2 className='text-2xl text-black font-primary font-medium mb-5'>
      Popular contents
      </h2>
      <div className='mt-5'>
        {
          Array.from({length:5}).map((_,index)=>(
            <div key={index} className='p-2 border-b-1 border-gray-700/10'>
     <div className='flex   gap-1'>
      <p className='text-xl font-semibold text-secondary'>{index+1}.</p>
     <div >
                <p className='text-lg font-medium  line-clamp-2'>How to solve react js error ?</p>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  <span>
                  <PiThumbsUpLight />
                  </span>
                  <p className='text-gray-800 font-medium'>20K</p>
                </div>
                <div className='flex items-center gap-1'>
                  <span>
                  <PiThumbsDownLight />
                  </span>
                  <p className='text-gray-800 font-medium'>20K</p>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-xl'>
                  <MdOutlineRemoveRedEye />
                  </span>
                  <p className='text-gray-800 font-medium'>900K</p>
                </div>
              </div>
        </div>
        
     </div>
            </div>
          ))
        }
      </div>
     </div>
    </div>

    {/* <div className='mt-10 grid grid-cols-1 lg:grid-cols-6  gap-5 '>
    <div className='col-span-2 border-2  border-pink-100 rounded-md p-5'>
     <h2 className='text-2xl text-black font-primary font-medium mb-5'>
     Subscribers
      </h2>
      <div className='mt-5'>
        
      </div>
     </div>

     <div className='p-5 lg:col-span-4 border-2  border-pink-100 rounded-md'>
      <h2 className='text-2xl text-black font-primary font-medium mb-5'>
       Last 30 days views
      </h2>
    <CustomShapeBarChart/>
     </div>
  
    </div> */}


    </div>
  )
}

export default ChannelAnalysis