import React from 'react'
import AuthFormModal from './AuthFormModal'
import { CgProfile } from 'react-icons/cg'

const SignInButton = () => {
  return (
    <AuthFormModal>
            <button className="flex items-center gap-2 mt-2 p-2 border-2 border-gray-700/10 rounded-full hover:bg-gray-100">
         <span className="text-2xl  text-info ">
         <CgProfile />
         </span>
         <p className=" text-info font-medium">
            Sign In
         </p>
         </button>
    </AuthFormModal>
  )
}

export default SignInButton