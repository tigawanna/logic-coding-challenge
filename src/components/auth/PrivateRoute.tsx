import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return user && user.nb_nombreUsuario ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
