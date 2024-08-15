import React from 'react';
import { Navigate } from 'react-router-dom';

import { getToken, isSuperAdminFunction } from './utils';

function ProtectedRouteSuperAdmin({ element: Element }) {
  const isAdmin = isSuperAdminFunction();

  if (getToken()) {
    if (isAdmin) {
      return <Element />;
    }
    return <Navigate to="/comm-telephony/virtual-number" />;
  }

  return <Navigate to="/login-methods/comm-chat/sign-in" />;
}

export default ProtectedRouteSuperAdmin;
