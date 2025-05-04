

const AuthForm = () => {
  return (
    <div className='p-5'>
       <h1 className='text-2xl mb-10 font-primary font-medium'>Sign in your account </h1>
       <button className='flex justify-center items-center gap-4  w-full px-4 py-2 hover:bg-gray-50 border-2  border-gray-800/20 rounded-full'>
         <img src="/src/assets/google-logo.png" alt="" className='size-8' />
         <p className='font-medium uppercase text-gray-800'>Continue With Google</p>
       </button>
       <img src="/src/assets/signin-main.png" alt="" className=' object-cover size-1/2 mx-auto'/>
       
       <p className='text-gray-700 text-sm w-10/12 mx-auto text-center'>
       Google Sign-In allows ZynTube users to securely log in using their Google account, offering a fast, easy, and password-free experience.
       </p>
    </div>
  )
}

export default AuthForm