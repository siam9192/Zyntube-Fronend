import { auth } from './index';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { setAccessToken } from '../helpers';

export const loginWithGoogle = async (args?: {
  onStart?: () => void;
  onSuccess: () => void;
  onError?: (message: string) => void;
}) => {
  try {
    args?.onStart && args.onStart();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken;
    setAccessToken(accessToken as string);

    //  const {data} = await  axiosInstance.post("/auth/google-callback",{accessToken})
    //  const resData  =  data

    args?.onSuccess && args.onSuccess();
  } catch (error: any) {
    console.log(error);
    args?.onError && args.onError(error.response.data.message);
  }
};

export async function signout() {
  await signOut(auth);
}
