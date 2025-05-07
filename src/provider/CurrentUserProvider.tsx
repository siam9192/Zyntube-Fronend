import { Dispatch } from '@reduxjs/toolkit';
import { getRedirectResult, onAuthStateChanged } from 'firebase/auth';
import React, { createContext, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { IUser } from '../types/user.type';
interface IProps {
  children: ReactNode;
}
type TContextValue = {
  isLoading: boolean;
  error: any;
    user: IUser | null;
    isUserExist: boolean;
    setIsLoading: (bol: boolean) => void;
    setError: (err: any) => void;
    setUser: Dispatch<SetStateAction<any>>;
  refetch: () => void;
};
export const UserContext = createContext<TContextValue | null>(null);
function CurrentUserProvider({ children }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<IUser|null>(null);
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true)
    onAuthStateChanged(auth, user => {
      if (user) {
        console.log('User is signed in:', user);
        console.log('User ID:', user.uid);
        console.log('Email:', user.email);
      } else {
       setUser(null)
      }
      setIsLoading(false)
    });
  }, []);
  return children;
}

export default CurrentUserProvider;
