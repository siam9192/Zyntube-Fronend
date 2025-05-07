import React, { useEffect } from 'react';
import { auth } from './';
import { getRedirectResult, GoogleAuthProvider, UserCredential } from 'firebase/auth';

const AuthHandler = () => {
  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const result: UserCredential | null = await getRedirectResult(auth);
        if (result) {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken ?? null;
          const user = result.user;
          console.log('User:', user);
          console.log('Access Token:', token);
        }
      } catch (error: any) {
        const errorCode = error?.code;
        const errorMessage = error?.message;
        const email = error?.customData?.email ?? null;
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error('Error Code:', errorCode);
        console.error('Message:', errorMessage);
        console.error('Email:', email);
        console.error('Credential:', credential);
      }
    };

    handleRedirect();
  }, []);

  return null;
};

export default AuthHandler;
