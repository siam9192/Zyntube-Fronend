import React from 'react'
import { BsCameraVideo } from 'react-icons/bs'
import { GoBell } from 'react-icons/go'
import { TfiLayoutGrid2 } from 'react-icons/tfi'
import VoiceSearchButton from './VoiceSearchButton'
import ProfileDropDown from './ProfileDropDown'

const HeaderUtils = () => {
  return (
    <div className='flex items-center md:gap-6 gap-3'>
       <div className='md:block hidden'>
       <VoiceSearchButton/>
       </div>
        <button   className='text-3xl text-black'>
            <BsCameraVideo />
        </button>
        <button  className='text-2xl text-black md:block hidden'>
        <TfiLayoutGrid2 />
        </button>
        <button  className='text-3xl text-black'>
        <GoBell />
        </button>
        <ProfileDropDown/>
    </div>
  )
}

export default HeaderUtils