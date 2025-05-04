import React, { ReactNode } from 'react'
interface IProps {
    children:ReactNode
}
const Container = ({children}:IProps) => {
  return (
    <div className='max-w-[1200px] mx-auto'>{children}</div>
  )
}

export default Container