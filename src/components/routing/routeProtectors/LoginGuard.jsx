import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
/**
 *
 * Another way to export directly your functional component.
 */
export function LoginGuard(props) {
  const { children } = props;
  if (!localStorage.getItem('token')) {
    return children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/game" />;
}

LoginGuard.propTypes = {
  children: PropTypes.object.isRequired,
};
