import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useCookies } from 'react-cookie';

/**
 *
 * Another way to export directly your functional component.
 */
export function LoginGuard(props) {
  const [cookies, _setCookie] = useCookies(['userId', 'token']);

  const { children } = props;
  if (!cookies.token) {
    return children;
  }
  // if user is already logged in, redirects to the main /app
  return <Redirect to="/home" />;
}

LoginGuard.propTypes = {
  children: PropTypes.object.isRequired,
};
