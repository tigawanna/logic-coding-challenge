import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import UserDetails from './components/pages/UserDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-details" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
