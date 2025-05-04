
import './App.css'
import ProfileSetup from './component/ui/ProfileSetup'
import Provider from './provider/Provider'
import { Outlet } from 'react-router-dom'

function App() {
  
  return (
    <>
      <Provider>
        <Outlet/>
        <ProfileSetup/>
      </Provider>
    </>
  )
}

export default App
