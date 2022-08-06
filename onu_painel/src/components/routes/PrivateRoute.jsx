import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function PrivateRoute({ children }) {
  const accessToken = false;
  const loading = false;
  const location = useLocation();
  const fromLocation = (location.state)?.from;
  const previousLocation = location.state ? fromLocation : { pathname: '/login' };

  if (accessToken) {
    return children;
  } else if (loading) {
    return <p>Loading ...</p>;
  } else if (!accessToken && !loading) {
    return <Navigate to={previousLocation} state={{from: location}} replace />;
  } else {
    return <p>Something went wrong</p>;
  }
}

export default PrivateRoute;
