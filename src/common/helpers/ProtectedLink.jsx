/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link } from 'react-router-dom';

function ProtectedLink({ to, isAuthenticated, ...rest }) {
  return <Link to={`${to}`} {...rest} />;
}

export default ProtectedLink;
