import { ReactNode, useEffect, useState } from 'react';
import AuthForm from '../forms/AuthForm';

interface IProps {
  children: ReactNode;
}
const AuthFormModal = ({ children }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);
  return (
    <>
      <div className=" size-fit " onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <div
        onClick={() => setIsOpen(false)}
        className={`bg-gray-900/40 flex justify-center items-center fixed inset-0 z-40 ${isOpen ? 'opacity-100' : 'opacity-0  hidden'} duration-100 `}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="  w-10/12 md:w-1/2 lg:w-1/3 bg-white  drop-shadow-2xl rounded-lg select-none"
        >
          <AuthForm onSuccess={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default AuthFormModal;
