
import './App.css';
import Login from './components/Login';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ChatRoom from './components/ChatRoom';
import AuthProvider from './Context/AuthProvider';
import AppProvider from './Context/AppProvider';
import AddRoomModal from './components/Modals/AddRoomModal';
import InviteMemberModal from './components/Modals/InviteMemberModal';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <AppProvider>
     
        <Routes>
          <Route element={<Login />} path='/login' />
          <Route element={<ChatRoom />} path='/' />
        {/* Add more routes here */}
        </Routes>
        <AddRoomModal/>
        <InviteMemberModal/>
        </AppProvider>
      </AuthProvider>
    
    </BrowserRouter>
         //<Login/> 
  );
}

export default App;
