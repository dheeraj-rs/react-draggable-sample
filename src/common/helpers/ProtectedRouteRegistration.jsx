import React from 'react';
import { Navigate } from 'react-router-dom';
import { isSuperAdminFunction } from './utils';

function ProtectedRouteRegistration({ element: Element }) {
  const isAdmin = isSuperAdminFunction();
  if (isAdmin) {
    return <Element />;
  }
  return <Navigate to="/404" />;
}

export default ProtectedRouteRegistration;
