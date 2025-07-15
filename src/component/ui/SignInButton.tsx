import { CgProfile } from 'react-icons/cg';
import { useAppDispatch } from '../../redux/hook';
import { toggle } from '../../redux/slices/toggle.slice';

const SignInButton = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(toggle({ isOpenLoginModal: true }))}
      className="flex items-center gap-2 mt-2 p-2 border-2 border-gray-700/10 rounded-full hover:bg-gray-100"
    >
      <span className="text-2xl  text-info ">
        <CgProfile />
      </span>
      <p className=" text-info font-medium">Sign In</p>
    </button>
  );
};

export default SignInButton;
