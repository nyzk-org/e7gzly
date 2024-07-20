import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    console.log(localStorage.getItem('role'))
  return (
    <Route {...rest} render={
        (props) => (
        localStorage.getItem('role') === 'admin'
          ? <Component {...props} />
          : <Redirect to='/' />
      )} />
  )
}

export default ProtectedRoute;
