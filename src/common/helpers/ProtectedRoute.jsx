import React from 'react';
import { Navigate } from 'react-router-dom';

import { getToken } from './utils';

function ProtectedRoute({ element: Element }) {
  if (getToken()) {
    return <Element />;
  }

  return <Navigate to="/login-methods/comm-chat/sign-in" />;
}

export default ProtectedRoute;
