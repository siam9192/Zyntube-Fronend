import './App.css';
import ProfileSetup from './component/ui/ProfileSetup';
import { Outlet } from 'react-router-dom';
import useCurrentUser from './hooks/useCurrentUser';
import envConfig from './config/env.config';

function App() {
  const { user, isUserExist } = useCurrentUser();
  console.log(envConfig);
  return (
    <>
      {isUserExist && !user?.app.setupStatus ? <ProfileSetup /> : null}

      <Outlet />
    </>
  );
}

export default App;
