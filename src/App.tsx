import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import UserDetails from './components/pages/UserDetails';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/user-details" element={<PrivateRoute />}>
        <Route path="" element={<UserDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
