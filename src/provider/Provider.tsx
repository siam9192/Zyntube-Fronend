import React from 'react';
import * as ReactRedux from 'react-redux';
import { store } from '../redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import envConfig from '../config/env.config';
import { Toaster } from 'sonner';
import CurrentUserProvider from './CurrentUserProvider';

type TProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: TProvider) {
  const clientId = envConfig.google.clientId as string;
  return (
    <ReactRedux.Provider store={store}>
      <CurrentUserProvider>
     {children}
      </CurrentUserProvider>
      <Toaster />
    </ReactRedux.Provider>
  );
}
