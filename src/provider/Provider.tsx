import React from 'react';
import * as ReactRedux from 'react-redux';
import { store } from '../redux/store';
import { Toaster } from 'sonner';
import CurrentUserProvider from './CurrentUserProvider';

type TProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: TProvider) {
  return (
    <ReactRedux.Provider store={store}>
      <CurrentUserProvider>{children}</CurrentUserProvider>
      <Toaster />
    </ReactRedux.Provider>
  );
}
