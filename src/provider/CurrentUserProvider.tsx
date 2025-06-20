import { onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { auth } from '../firebase';
import { IUser } from '../types/user.type';
import { setAccessToken } from '../helpers';
import { getMe } from '../services/user.service';
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
  setUser: (user: IUser | null) => void;
  refetch: () => void;
};
export const CurrentUserProviderContext = createContext<TContextValue | null>(null);
function CurrentUserProvider({ children }: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [toggle, setToggle] = useState<boolean>(false);
  useEffect(() => {
    onAuthStateChanged(auth, async function (user) {
      if (user) {
        console.log(11);
        try {
          // setAccessToken(await user.getIdToken());
          const data = await getMe();
          setUser({
            google: user,
            app: data.data,
          });
        } catch (error: any) {}
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
  }, [toggle]);

  const refetch = () => setToggle(p => !p);
  const handelSetUser = (user: IUser | null) => {
    setUser(user);
  };
  const handelSetIsLoading = (st: boolean) => {
    setIsLoading(st);
  };
  const value: TContextValue = {
    isLoading,
    setIsLoading: handelSetIsLoading,
    error,
    setError,
    user,
    setUser: handelSetUser,
    isUserExist: user ? true : false,
    refetch,
  };

  return (
    <CurrentUserProviderContext.Provider value={value}>
      {children}
    </CurrentUserProviderContext.Provider>
  );
}

export default CurrentUserProvider;
