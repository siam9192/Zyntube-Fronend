import { useEffect } from 'react';
import './App.css';
import ProfileSetup from './component/ui/ProfileSetup';
import AuthHandler from './firebase/AuthHandler';
import Provider from './provider/Provider';
import { Outlet } from 'react-router-dom';
import { getRedirectResult } from 'firebase/auth';
import { auth } from './firebase';

function App() {
 
  return (
    <>
      <Provider>
        <Outlet />
      </Provider>
    </>
  );
}

export default App;
