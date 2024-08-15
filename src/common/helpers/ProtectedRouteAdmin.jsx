import React from 'react';
import { Navigate } from 'react-router-dom';

import { getToken, isSuperAdminFunction, isTenantAdminFunction } from './utils';

function ProtectedRouteAdmin({ element: Element }) {
  const isAdmin = isSuperAdminFunction();
  const isTenantAdmin = isTenantAdminFunction();

  if (getToken()) {
    if (isAdmin || isTenantAdmin) {
      return <Element />;
    }
    return <Navigate to="/comm-telephony" />;
  }

  return <Navigate to="/login-methods/comm-chat/sign-in" />;
}

export default ProtectedRouteAdmin;
