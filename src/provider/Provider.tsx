import React from "react";
import * as ReactRedux from "react-redux";
import { store } from "../redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";
import envConfig from "../config/env.config";
import { Toaster } from "sonner";
type TProvider = {
  children: React.ReactNode;
};

export default function Provider({ children }: TProvider) {
  return (
    <ReactRedux.Provider store={store}>
      <GoogleOAuthProvider clientId={""}>
    {
        children
    }
      </GoogleOAuthProvider>
      <Toaster />
    </ReactRedux.Provider>
  );
}
