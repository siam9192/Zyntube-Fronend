// googleLogin.ts
import axiosInstance from '../axios';
import envConfig from '../config/env.config';

import { auth } from './index';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';


export const loginWithGoogle = async (args?:{onStart?:()=>void,onSuccess:()=>void,onError?:(message:string)=>void})=> {
  try {

    args?.onStart && args.onStart()
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });
   
   const result =   await signInWithPopup(auth, provider);
   const credential = GoogleAuthProvider.credentialFromResult(result);
   const accessToken = credential?.accessToken;
   
   const {data} = await  axiosInstance.post("/auth/google-callback",{accessToken})
   const resData  =  data
   console.log(resData)
       
   args?.onSuccess && args.onSuccess()
  } catch (error:any) {
    console.log(error)
    args?.onError && args.onError(error.response.data.message)
  }
};

export async function signout() {
  await signOut(auth);
}
