import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { useCookies } from 'react-cookie';

/**
 * routeProtectors interfaces can tell the router whether or not it should allow navigation to a requested route.
 * They are functional components. Based on the props passed, a route gets rendered.
 * In this case, if the user is authenticated (i.e., a token is stored in the local storage)
 * {props.children} are rendered --> The content inside the <HomeGuard> in the App.js file, i.e. the user is able to access the main app.
 * If the user isn't authenticated, the components redirects to the /login screen
 * @Guard
 * @param props
 */
export function HomeGuard(props) {
  const [cookies, _setCookie] = useCookies(['userId', 'token']);
  const { children } = props;
  if (cookies.token) {
    return children;
  }
  return <Redirect to="/login" />;
}

HomeGuard.propTypes = {
  children: PropTypes.node.isRequired,
};
