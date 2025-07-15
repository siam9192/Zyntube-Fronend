import { useEffect } from 'react';
import AuthForm from '../forms/AuthForm';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { toggle } from '../../redux/slices/toggle.slice';
import useCurrentUser from '../../hooks/useCurrentUser';

const AuthFormModal = () => {
  const { isUserExist } = useCurrentUser();
  const isOpen = useAppSelector(state => state.toggle.isOpenLoginModal);
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }, [isOpen]);

  const dispatch = useAppDispatch();
  const closeModal = () => {
    dispatch(toggle({ isOpenLoginModal: false }));
  };
  if (isUserExist) return null;
  return (
    <>
      <div
        onClick={closeModal}
        className={`bg-gray-900/40 flex justify-center items-center fixed inset-0 z-40 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible  hidden'} duration-100 `}
      >
        <div
          onClick={e => e.stopPropagation()}
          className="  w-10/12 md:w-1/2 lg:w-1/3 bg-white  drop-shadow-2xl rounded-lg select-none"
        >
          <AuthForm onSuccess={closeModal} />
        </div>
      </div>
    </>
  );
};

export default AuthFormModal;
