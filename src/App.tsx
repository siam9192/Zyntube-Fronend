import './App.css';
import ProfileSetup from './component/ui/ProfileSetup';
import { Outlet } from 'react-router-dom';
import AuthFormModal from './component/ui/AuthFormModal';

function App() {
  return (
    <>
      {/* Global modals */}
      <ProfileSetup />
      <AuthFormModal />

      {/* Layout pages */}
      <Outlet />
    </>
  );
}

export default App;
